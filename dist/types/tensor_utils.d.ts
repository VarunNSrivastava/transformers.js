/**
 * This creates a nested array of a given type and depth (see examples).
 */
export type NestArray<T, Depth extends number, Acc extends never[] = []> = Acc['length'] extends Depth ? T : NestArray<T[], Depth, [...Acc, never]>;
export class Tensor extends ONNX.TypedTensor<"string"> {
    constructor(...args: any[]);
    /**
     *
     * @param {number} index
     * @returns
     */
    get(index: number): string | Tensor;
    /**
     * @param {any} item
     * @returns {number}
     */
    indexOf(item: any): number;
    /**
     * @param {number} index
     * @param {number} iterSize
     * @param {any} iterDims
     * @returns {this}
     */
    _subarray(index: number, iterSize: number, iterDims: any): this;
    tolist(): string[];
    /**
     * Returns an iterator object for iterating over the tensor data in row-major order.
     * If the tensor has more than one dimension, the iterator will yield subarrays.
     * @returns {Iterator} An iterator object for iterating over the tensor data in row-major order.
     */
    [Symbol.iterator](): Iterator<any, any, undefined>;
}
/**
 * Transposes a tensor according to the provided axes.
 * @param {any} tensor - The input tensor to transpose.
 * @param {Array} axes - The axes to transpose the tensor along.
 * @returns {Tensor} The transposed tensor.
 */
export function transpose(tensor: any, axes: any[]): Tensor;
/**
 * Concatenates an array of tensors along the 0th dimension.
 *
 * @param {any} tensors - The array of tensors to concatenate.
 * @returns {Tensor} - The concatenated tensor.
 */
export function cat(tensors: any): Tensor;
import ONNX = require("onnxruntime-web");
