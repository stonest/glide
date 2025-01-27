import {
  Box,
  Button,
  Collapse,
  Flex,
  HStack,
  VStack,
  Input,
  Spinner,
  Text,
  useDisclosure,
  Wrap,
  StackDivider,
  FormControl,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Center,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { adminGetTargetGroupResources } from "../../../../utils/backend-client/admin/admin";
import ReactSelect from "react-select";
import {
  ResourceFilter,
  ResourceFilterOperationTypeEnum,
  TargetGroupResource,
  TargetGroup,
  TargetGroupSchemaArgument,
} from "../../../../utils/backend-client/types";
import { adminFilterTargetGroupResources } from "../../../../utils/backend-client/default/default";
import { DynamicOption } from "../../../../components/DynamicOption";
import { CloseIcon } from "@chakra-ui/icons";
import { FilterIcon } from "../../../../components/icons/Icons";
import { MultiSelect } from "./Select";
import { useFormContext, Controller } from "react-hook-form";

interface TargetGroupFieldProps {
  targetGroup: TargetGroup;
  fieldSchema: TargetGroupSchemaArgument;
}

interface ResourceSchemaProperty {
  title: string;
  type: string;
}

interface TargetGroupFilterOperation {
  attribute: string;
  values: string[];
  value: string;
  operationType: string;
}

export const TargetGroupField: React.FC<TargetGroupFieldProps> = (props) => {
  const { targetGroup, fieldSchema } = props;
  const [resources, setResources] = useState<TargetGroupResource[]>([]);
  const { isOpen, onToggle, onClose } = useDisclosure();

  const { setValue } = useFormContext<any>();

  const [filteredResources, setFilterResources] = useState<
    TargetGroupResource[]
  >([]);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (fieldSchema?.resource) {
      setLoading(true);
      adminGetTargetGroupResources(targetGroup.id, fieldSchema.resource)
        .then((data) => {
          setResources(data);
        })
        .finally(() => setLoading(false));
    }
    onClose();
  }, [targetGroup]);

  return (
    <Box w="100%">
      <Box pt={4}>
        <Text color={"black"}>{fieldSchema.title} </Text>
        <Text size={"sm"}>{fieldSchema.description} </Text>
      </Box>
      <VStack
        // divider={<StackDivider borderColor="neutrals.200" />}
        w="100%"
        align={"flex-start"}
        spacing={0}
        rounded="md"
        border="1px solid"
        bgColor={"white"}
        borderColor="neutrals.300"
      >
        {loading && resources.length == 0 ? (
          <Center minW="100%" minH="120px">
            <Spinner />
          </Center>
        ) : (
          <>
            {!isOpen && (
              <Box>
                <Text
                  textStyle={"Body/Medium"}
                  color="neutrals.500"
                  pl={4}
                  pb={2}
                  pt={2}
                >
                  Available {fieldSchema.title}s
                </Text>
                {resources.length! ? (
                  <Box height={"200px"} overflow={"hidden"}>
                    <Wrap spacing={1} position="relative" h="100%">
                      {/* we slice this to not overpopulate the DOM */}
                      {resources.slice(0, 24).map((opt) => {
                        return (
                          <DynamicOption
                            key={"cp-" + opt.resource.id}
                            label={opt.resource.name}
                            value={opt.resource.id}
                          />
                        );
                      })}

                      {resources.length > 5 && [
                        <Box
                          position="absolute"
                          bottom={0}
                          left={0}
                          right={0}
                          h="100%"
                          bg="linear-gradient(-15deg, rgba(255,255,255,1) 15%, rgba(255,255,255,0) 100%)"
                          rounded="md"
                          margin="0px !important"
                        />,
                        <Text
                          textStyle="Body/Small"
                          color="neutrals.500"
                          position="absolute"
                          bottom={2}
                          right={2}
                        >
                          +{resources.length - 5} more
                        </Text>,
                      ]}
                    </Wrap>
                  </Box>
                ) : (
                  <Alert status="warning">
                    <AlertIcon />
                    <AlertTitle>No resources synced!</AlertTitle>
                    <AlertDescription>
                      You can manually sync your target resources by running
                      cache sync command
                    </AlertDescription>
                  </Alert>
                )}
              </Box>
            )}
            <FieldFilterView
              isOpen={isOpen}
              targetGroup={targetGroup}
              fieldSchema={fieldSchema}
              resources={resources}
              filteredResources={filteredResources}
              setFilteredResources={setFilterResources}
            />
            <Flex
              justifyContent={"space-between"}
              align="center"
              flexGrow="1"
              p={2}
              w="100%"
            >
              <Text ml={2}>{0} Filters Applied</Text>

              {!isOpen ? (
                <Button
                  rounded="full"
                  variant="ghost"
                  onClick={onToggle}
                  leftIcon={<FilterIcon />}
                >
                  Apply Filter
                </Button>
              ) : (
                <Button
                  leftIcon={<CloseIcon boxSize={2} />}
                  rounded="full"
                  color="red.400"
                  variant="ghost"
                  _hover={{
                    bg: "actionDanger.100",
                  }}
                  _active={{
                    bg: "actionDanger.100",
                  }}
                  onClick={() => {
                    onToggle();

                    setValue(
                      `targetgroups.${targetGroup.id}.${fieldSchema.id}.attribute`,
                      "id"
                    );

                    setValue(
                      `targetgroups.${targetGroup.id}.${fieldSchema.id}.values`,
                      []
                    );

                    setValue(
                      `targetgroups.${targetGroup.id}.${fieldSchema.id}.operationType`,
                      ResourceFilterOperationTypeEnum.IN
                    );

                    setValue(
                      `targetgroups.${targetGroup.id}.${fieldSchema.id}.value`,
                      ""
                    );

                    setFilterResources([]);
                  }}
                >
                  Remove Filter
                </Button>
              )}
            </Flex>
          </>
        )}
      </VStack>
    </Box>
  );
};

const createFilterOperationOptions = () => {
  return Object.entries(ResourceFilterOperationTypeEnum).map(
    ([value, label]) => ({
      value,
      label: label.toLowerCase(),
    })
  );
};

interface FieldFilterViewProps {
  isOpen: boolean;
  targetGroup: TargetGroup;
  fieldSchema: TargetGroupSchemaArgument;
  resources: TargetGroupResource[];
  filteredResources: TargetGroupResource[];
  setFilteredResources: (data: TargetGroupResource[]) => void;
}

const FieldFilterView: React.FC<FieldFilterViewProps> = (props) => {
  const { isOpen, targetGroup, fieldSchema, resources, filteredResources } =
    props;

  const { watch, register, control, setValue } = useFormContext<any>();
  const [targetGroupFilterOpts] = watch(["targetgroups"]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [operationType, setOperationType] =
    useState<ResourceFilterOperationTypeEnum>(
      ResourceFilterOperationTypeEnum.IN
    );

  const createOptions = () => {
    const defaultOptions = [
      { value: "id", label: "Id" },
      { value: "name", label: "Name" },
    ];

    if (fieldSchema.resourceSchema) {
      const properties = fieldSchema.resourceSchema.properties;

      if (properties?.data) {
        const out = Object.entries(
          properties.data as Map<string, ResourceSchemaProperty>
        )
          // Only attibutes of type string is shown as backend only supports
          // filtering string values currently.
          .filter(([k, v]) => v.type === "string")
          .map(([k, v]) => ({ value: k, label: v.title }));

        defaultOptions.push(...out);
      }
    }

    return defaultOptions;
  };

  const fetchFilterResources = async () => {
    const resourceFilter = createResourceFilter(
      targetGroupFilterOpts[targetGroup.id][fieldSchema.id]
    );

    if (!resourceFilter || !fieldSchema.resource) {
      return;
    }

    setIsLoading(true);
    adminFilterTargetGroupResources(
      targetGroup.id,
      fieldSchema.resource,
      resourceFilter
    )
      .then((data) => {
        props.setFilteredResources(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  return (
    <Box p={4} w="100%">
      <Collapse in={isOpen} animateOpacity>
        <Flex align="start" position="relative" flexGrow="1">
          <HStack spacing={2} mr={2}>
            <Text color={"black"}> Where</Text>
            <Controller
              name={`targetgroups.${targetGroup.id}.${fieldSchema.id}.attribute`}
              control={control}
              defaultValue={"id"}
              render={({ field: { value, ref, name, onChange } }) => (
                <ReactSelect
                  ref={ref}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      width: 120,
                      borderColor: "#E5E5E5", // neutrals.300
                    }),
                  }}
                  options={createOptions()}
                  onChange={(val: any) => {
                    onChange(val?.value);
                  }}
                  value={createOptions().find((c) => c.value === value)}
                />
              )}
            />
            <Controller
              name={`targetgroups.${targetGroup.id}.${fieldSchema.id}.operationType`}
              control={control}
              defaultValue={"IN"}
              render={({ field: { value, ref, name, onChange } }) => (
                <ReactSelect
                  ref={ref}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      width: 120,
                      borderColor: "#E5E5E5", // neutrals.300
                    }),
                  }}
                  value={createFilterOperationOptions().find((c) => {
                    return c.value === value;
                  })}
                  options={createFilterOperationOptions()}
                  onChange={(val) => {
                    onChange(val?.value);
                    setOperationType(
                      val?.value as ResourceFilterOperationTypeEnum
                    );
                  }}
                />
              )}
            />
          </HStack>
          {operationType === ResourceFilterOperationTypeEnum.IN ? (
            <MultiSelect
              options={resources.map((r) => {
                return { label: r.resource.name, value: r.resource.id };
              })}
              fieldName={`targetgroups.${targetGroup.id}.${fieldSchema.id}.values`}
              onBlurSecondaryAction={() => fetchFilterResources()}
            />
          ) : (
            <FormControl>
              <Input
                {...register(
                  `targetgroups.${targetGroup.id}.${fieldSchema.id}.value`
                )}
                onBlur={() => fetchFilterResources()}
              />
            </FormControl>
          )}
        </Flex>
        <Box overflow="auto" h="200px" pt={4}>
          <Text>Preview</Text>
          {isLoading && <Spinner />}
          {filteredResources.map((r) => {
            return (
              <DynamicOption
                key={"cp-preview-" + r.resource.id}
                label={r.resource.name}
                value={r.resource.id}
              />
            );
          })}
        </Box>
      </Collapse>
    </Box>
  );
};

const createResourceFilter = (
  operation: TargetGroupFilterOperation
): ResourceFilter => {
  if (!operation.values?.length && operation.value == "") {
    return [];
  }

  return [
    {
      operationType: operation.operationType as ResourceFilterOperationTypeEnum,
      attribute: operation.attribute,
      ...(operation.operationType === ResourceFilterOperationTypeEnum.IN
        ? {
            values: operation.values || [],
          }
        : {
            value: operation.value,
          }),
    },
  ];
};
