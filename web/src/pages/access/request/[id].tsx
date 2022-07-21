import { ArrowBackIcon, InfoIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Collapse,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  IconButton,
  Input,
  InputRightElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
  Textarea,
  useRadioGroup,
  UseRadioGroupProps,
  Wrap,
} from "@chakra-ui/react";
import { addSeconds, format } from "date-fns";
import type { NextPage } from "next";
import React, { useEffect, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link, useMatch, useNavigate } from "react-location";
import { CFRadioBox } from "../../../components/CFRadioBox";
import { getProviderIcon } from "../../../components/icons/providerIcon";
import { UserLayout } from "../../../components/Layout";
import { UserAvatarDetails } from "../../../components/UserAvatar";
import {
  getUserGetAccessRuleApproversKey,
  userCreateRequest,
  useUserGetAccessRule,
  useUserGetAccessRuleApprovers,
} from "../../../utils/backend-client/end-user/end-user";
import { CreateRequestRequestBody } from "../../../utils/backend-client/types";
import { durationString } from "../../../utils/durationString";

export type When = "asap" | "scheduled";

interface NewRequestFormData extends CreateRequestRequestBody {
  startDateTime: string;
  when: When;
}

/**
 * returns helper text to be used below form fields for selecting when
 * access should be activated.
 */
export const getWhenHelperText = (
  when: When,
  requiresApproval: boolean
): string => {
  if (when === "asap" && requiresApproval)
    return "Access will be activated immediately after approval";
  if (when === "asap") return "Access will be activated immediately";

  return "Choose a time in future for the access to be activated";
};

const Home: NextPage = () => {
  const {
    params: { id: ruleId },
  } = useMatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const now = useMemo(() => {
    const d = new Date();
    d.setSeconds(0, 0);
    return format(d, "yyyy-MM-dd'T'HH:mm");
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    watch,
  } = useForm<NewRequestFormData>({
    shouldUnregister: true,
    defaultValues: {
      when: "asap",
      startDateTime: now,
      timing: {
        durationSeconds: 1,
      },
    },
  });

  const when = watch("when");
  const startTimeDate = watch("startDateTime");
  const durationSeconds = watch("timing.durationSeconds");

  const readableDuration = useMemo(() => {
    if (!durationSeconds) return "";
    const durationHours = durationSeconds * 60 * 60;
    if (when === "asap") {
      return durationString(durationHours);
    }
    const endTime = addSeconds(new Date(startTimeDate), durationHours);

    // avoid showing 'Invalid Date' text if the date can't be parsed properly
    // (for example if the user just enters 'e' in the field).
    const endTimeValid = endTime instanceof Date && !isNaN(endTime.getTime());
    if (!endTimeValid) return "";

    return `${durationString(
      durationHours
    )}, until ${endTime.toLocaleTimeString()}`;
  }, [durationSeconds, startTimeDate, when]);

  const { data: rule } = useUserGetAccessRule(ruleId);
  useEffect(() => {
    const md = rule?.timeConstraints?.maxDurationSeconds;
    if (md && md / 60 / 60 < durationSeconds) {
      setValue("timing.durationSeconds", md / 60 / 60);
    }
  }, [rule]);
  // Don't refetch the approvers
  const {
    data: approvers,
    isValidating: isValidatingApprovers,
  } = useUserGetAccessRuleApprovers(ruleId, {
    swr: {
      swrKey: getUserGetAccessRuleApproversKey(ruleId),
      refreshInterval: 0,
      revalidateOnFocus: false,
    },
  });
  const requiresApproval = !!approvers && approvers.users.length > 0;

  const onSubmit: SubmitHandler<NewRequestFormData> = async (data) => {
    setLoading(true);
    const duration = data.timing.durationSeconds ?? 2;

    let r: CreateRequestRequestBody = {
      accessRuleId: ruleId,
      timing: {
        durationSeconds: duration,
      },
      reason: data.reason,
    };
    if (data.when === "scheduled") {
      r.timing.startTime = new Date(data.startDateTime).toISOString();
    }
    await userCreateRequest(r);
    navigate({ to: "/requests" });
  };

  const maxDurationSeconds = rule?.timeConstraints.maxDurationSeconds;

  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);

  return (
    <>
      <UserLayout>
        <Center borderBottom="1px solid" borderColor="neutrals.200" h="80px">
          <IconButton
            as={Link}
            to="/requests"
            aria-label="Go back"
            pos="absolute"
            left={4}
            icon={<ArrowBackIcon />}
            rounded="full"
            variant="ghost"
          />

          <Text as="h4" textStyle="Heading/H4">
            New Access Request
          </Text>
        </Center>
        <Container minW="864px">
          <Box
            p={8}
            bg="neutrals.100"
            mt={12}
            borderRadius="6px"
            as="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Text as="h3" textStyle="Heading/H3">
              You are requesting access to
            </Text>

            <Stack
              spacing={2}
              mt={6}
              minH="52px" // prevents layout shift
            >
              {rule ? (
                <>
                  <Flex align="center" mr="auto">
                    {getProviderIcon(rule?.target.provider)}
                    <Text ml={2} textStyle="Body/Medium" color="neutrals.600">
                      {rule?.name}
                    </Text>
                  </Flex>
                  <Text textStyle="Body/Medium">{rule?.description}</Text>
                </>
              ) : (
                <>
                  <Flex align="center">
                    <SkeletonCircle h={8} w={8} mr={2} />
                    <SkeletonText w="14ch" noOfLines={1} />
                  </Flex>
                  <SkeletonText w="10ch" noOfLines={1} />
                </>
              )}
            </Stack>

            <Box mt={12}>
              <Stack spacing={10}>
                <FormControl
                  pos="relative"
                  id="when"
                  isInvalid={errors.when !== undefined}
                >
                  <FormLabel textStyle="Body/Medium" fontWeight="normal">
                    When do you need access?
                  </FormLabel>

                  <Controller
                    name="when"
                    control={control}
                    render={({ field }) => <WhenRadioGroup {...field} />}
                  />
                  <FormHelperText color="neutrals.600" minH="17px">
                    {isValidatingApprovers ? (
                      <SkeletonText w="24ch" noOfLines={1} />
                    ) : (
                      getWhenHelperText(when, requiresApproval)
                    )}
                  </FormHelperText>
                </FormControl>

                {/* use a Flex here to avoid the Collapse animation jumping due to being nested within a <Stack /> */}
                <Flex direction={"column"}>
                  <Collapse in={when === "scheduled"} animateOpacity>
                    <FormControl mb={10}>
                      <FormLabel textStyle="Body/Medium" fontWeight="normal">
                        Start Time
                      </FormLabel>

                      <Input
                        {...register("startDateTime")}
                        bg="white"
                        type="datetime-local"
                        min={now}
                        defaultValue={now}
                      />

                      {startTimeDate && (
                        <FormHelperText color="neutrals.600">
                          {new Date(startTimeDate).toString()}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Collapse>

                  <FormControl
                    pos="relative"
                    isInvalid={errors.timing?.durationSeconds !== undefined}
                  >
                    <FormLabel textStyle="Body/Medium" fontWeight="normal">
                      How long in hours do you need access for?
                    </FormLabel>
                    <Controller
                      name="timing.durationSeconds"
                      control={control}
                      rules={{ required: "Duration is required." }}
                      render={({ field, fieldState }) => {
                        const onBlurFn = () => {
                          const duration = hours * 60 * 60 + mins * 60;

                          if (
                            maxDurationSeconds &&
                            duration > maxDurationSeconds
                          ) {
                            setValue(
                              "timing.durationSeconds",
                              maxDurationSeconds
                            );

                            // DE = when an out of bounds value is adjusted to maxSeconds, we need to update the hours and mins to match
                            // Firstly calculate what the hours would be
                            let h = maxDurationSeconds / 60 / 60;
                            let m = (maxDurationSeconds / 60) % 60;

                            setHours(h);
                            setMins(m);

                            // Invalidate the field
                          } else {
                            setValue("timing.durationSeconds", duration);
                          }
                        };

                        let maxH = maxDurationSeconds
                          ? maxDurationSeconds / 3600
                          : 12;

                        return (
                          <HStack>
                            <NumberInput
                              variant="reveal"
                              defaultValue={1}
                              min={0}
                              step={1}
                              role="group"
                              max={maxH}
                              w="100px"
                              value={hours}
                              onChange={(s, n) => setHours(n)}
                              className="peer"
                              onBlur={onBlurFn}
                            >
                              <NumberInputField bg="white" />
                              <InputRightElement
                                pos="absolute"
                                right={10}
                                w="8px"
                                color="neutrals.500"
                                userSelect="none"
                                textAlign="left"
                              >
                                hrs
                              </InputRightElement>
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
                            <NumberInput
                              variant="reveal"
                              role="group"
                              defaultValue={1}
                              min={0}
                              step={1}
                              max={59}
                              w="100px"
                              value={mins}
                              onChange={(s, n) => {
                                if (
                                  maxDurationSeconds &&
                                  hours * 3600 + mins * 60 >= maxDurationSeconds
                                ) {
                                  return;
                                } else setMins(n);
                              }}
                              className="peer"
                              onBlur={onBlurFn}
                              onKeyDown={(e) => {
                                // allow stepping up from 59 to 0
                                if (e.key === "ArrowUp") {
                                  if (mins === 59 && hours <= maxH) {
                                    setMins(0);
                                    setHours(hours + 1);
                                  }
                                } else if (e.key === "ArrowDown") {
                                  if (mins === 0 && hours > 0) {
                                    setMins(59);
                                    setHours(hours - 1);
                                  }
                                }
                              }}
                            >
                              <NumberInputField bg="white" />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                              <InputRightElement
                                pos="absolute"
                                right={10}
                                w="8px"
                                color="neutrals.500"
                                userSelect="none"
                                textAlign="left"
                              >
                                mins
                              </InputRightElement>
                            </NumberInput>
                            {maxDurationSeconds && (
                              <Text textStyle={"Body/ExtraSmall"}>
                                Maximum: {durationString(maxDurationSeconds)}
                              </Text>
                            )}
                          </HStack>
                        );
                      }}
                    />

                    {errors.timing?.durationSeconds !== undefined ? (
                      <FormErrorMessage>
                        {errors.timing?.durationSeconds.message}
                      </FormErrorMessage>
                    ) : (
                      <FormHelperText color="neutrals.600">
                        {/* {readableDuration} */}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Flex>

                <FormControl>
                  <FormLabel textStyle="Body/Medium" fontWeight="normal">
                    Why do you need access?
                  </FormLabel>
                  <Textarea
                    bg="white"
                    placeholder="Deploying initial Terraform infrastructure for CF-123"
                    {...register("reason")}
                  />
                </FormControl>

                {/* Don't show approval section if approvers are still loading */}
                <Approvers approvers={approvers?.users} />
                <Box>
                  <Button type="submit" isLoading={loading} mr={3}>
                    Submit
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Container>
      </UserLayout>
    </>
  );
};

export const WhenRadioGroup: React.FC<UseRadioGroupProps> = (props) => {
  const { getRootProps, getRadioProps } = useRadioGroup(props);
  const group = getRootProps();

  return (
    <HStack {...group}>
      <CFRadioBox {...getRadioProps({ value: "asap" })}>
        <Text textStyle="Body/Medium">ASAP</Text>
      </CFRadioBox>
      <CFRadioBox {...getRadioProps({ value: "scheduled" })}>
        <Text textStyle="Body/Medium">Scheduled</Text>
      </CFRadioBox>
    </HStack>
  );
};

export default Home;

const Approvers: React.FC<{ approvers?: string[] }> = ({ approvers }) => {
  if (approvers === undefined) {
    return <Skeleton w="50%" h={10} />;
  }
  if (approvers.length > 0) {
    return (
      <Box textStyle="Body/Medium" maxW="470px">
        Approvers
        <Wrap spacing={2}>
          {approvers?.map((approver) => (
            // Using style props, we're able to more closely match the figma designs
            <UserAvatarDetails
              key={approver}
              user={approver}
              size="xs"
              textProps={{
                textStyle: "Body/Small",
                color: "neutrals.500",
              }}
            />
          ))}
        </Wrap>
      </Box>
    );
  }
  return (
    <Text color="neutrals.600" display="flex" alignItems="center">
      <InfoIcon mr={2} />
      Approval is not required for this role, so you&apos;ll get access
      immediately
    </Text>
  );
};
