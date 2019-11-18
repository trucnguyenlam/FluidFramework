/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { ISharedObject } from "@microsoft/fluid-shared-object-base";

/**
 * X/Y point.
 */
export interface IPoint {
    /**
     * X coordinate
     */
    x: number;
    /**
     * Y coordinate
     */
    y: number;
}

/**
 * RGBA color.
 */
export interface IColor {
    /**
     * Red value
     */
    r: number;

    /**
     * Green value
     */
    g: number;

    /**
     * Blue value
     */
    b: number;

    /**
     * Alpha value
     */
    a: number;
}

/**
 * Shared data structure for representing ink.
 */
export interface IInk extends ISharedObject {
    /**
     * Get the collection of strokes stored in this Ink object.
     * @returns the array of strokes
     */
    getStrokes(): IInkStroke[];

    /**
     * Get a specific stroke with the given key.
     * @param key - ID for the stroke
     * @returns the requested stroke, or undefined if it does not exist
     */
    getStroke(key: string): IInkStroke;

    /**
     * Send the op and apply it to the local Ink object as well.
     * @param operation - op to submit and apply
     */
    submitOperation(operation: IInkOperation): void;
}

/**
 * Pen data for the current stroke
 */
export interface IPen {
    /**
     * Color in RGBA.
     */
    color: IColor;

    /**
     * Thickness of pen in pixels.
     */
    thickness: number;
}

/**
 * Signals a clear operation.
 */
export interface IClearOperation {
    /**
     * String identifier for the operation type.
     */
    type: "clear";

    /**
     * Time, in milliseconds, that the operation occurred on the originating device.
     */
    time: number;
}

/**
 * Create stroke operations notify clients that a new stroke has been created, along with basic information about
 * the stroke.
 */
export interface ICreateStrokeOperation {
    /**
     * String identifier for the operation type.
     */
    type: "createStroke";

    /**
     * Time, in milliseconds, that the operation occurred on the originating device.
     */
    time: number;

    /**
     * Unique ID that will be used to reference this stroke.
     */
    id: string;

    /**
     * Description of the pen used to create the stroke.
     */
    pen: IPen;
}

/**
 * Base interface for stylus operations.
 */
export interface IStylusOperation {
    /**
     * String identifier for the operation type.
     */
    type: "stylus";

    /**
     * Time, in milliseconds, that the operation occurred on the originating device.
     */
    time: number;

    /**
     * The location of the stylus.
     */
    point: IPoint;

    /**
     * The ink pressure applied (typically from PointerEvent.pressure).
     */
    pressure: number;

    /**
     * ID of the stroke this stylus operation is associated with.
     */
    id: string;
}

/**
 * Ink operations are one of several types.
 */
export type IInkOperation =
    IClearOperation |
    ICreateStrokeOperation |
    IStylusOperation;

/**
 * Represents a single ink stroke.
 */
export interface IInkStroke {
    /**
     * Unique identifier for the ink stroke.
     */
    id: string;

    /**
     * The operations contained within the stroke.
     */
    operations: IStylusOperation[];

    /**
     * Description of the pen used to create the stroke.
     */
    pen: IPen;
}