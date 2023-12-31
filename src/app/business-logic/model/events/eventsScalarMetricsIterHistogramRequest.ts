/**
 * events
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * OpenAPI spec version: 2.14
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import { ScalarKeyEnum } from '././scalarKeyEnum';


export interface EventsScalarMetricsIterHistogramRequest {
    /**
     * Task ID
     */
    task: string;
    /**
     * The amount of histogram points to return (0 to return all the points).   Optional, the default value is 6000.
     */
    samples?: number;
    key?: ScalarKeyEnum;
    /**
     * List of metrics and variants
     */
    metrics?: Array<object>;
  model_events?: boolean;
}
