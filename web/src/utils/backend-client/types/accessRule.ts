/**
 * Generated by orval v6.10.3 🍺
 * Do not edit manually.
 * Common Fate
 * Common Fate API
 * OpenAPI spec version: 1.0
 */
import type { AccessRuleStatus } from "./accessRuleStatus";
import type { AccessRuleTarget } from "./accessRuleTarget";
import type { AccessRuleTimeConstraints } from "./accessRuleTimeConstraints";
import type { AccessRuleApproverConfig } from "./accessRuleApproverConfig";
import type { AccessRuleMetadata } from "./accessRuleMetadata";

/**
 * AccessRule contains detailed information about a rule and is used in administrative apis.
 */
export interface AccessRule {
  id: string;
  status: AccessRuleStatus;
  name: string;
  description: string;
  targets: AccessRuleTarget[];
  timeConstraints: AccessRuleTimeConstraints;
  /** The group IDs that the access rule applies to. */
  groups: string[];
  approval: AccessRuleApproverConfig;
  metadata: AccessRuleMetadata;
  priority: number;
}
