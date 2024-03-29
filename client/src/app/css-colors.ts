/**
 * @namespace Enums
 */

//Css Colors

export type CssColors = "#000000" | "#A6A6A6" | "#666666" | "#0000FF" | "#000080" | "#FF0000" | "#800000" | "#00FF00"
    | "#008000" | "#FFA500" | "#B27300" | "#CC99CC" | "#800080";

/**
 * Enum of Css colors.
 * @typedef {string} Enums.CssColors
 */
export const CssColors = {
    Black: "#000000" as CssColors,
    LightGrey:	"#A6A6A6" as CssColors,
    DarkGrey: 	"#666666" as CssColors,
    Blue:		"#0000FF" as CssColors,
    DarkBlue:	"#000080" as CssColors,
    Red: 		"#FF0000" as CssColors,
    DarkRed:	"#800000" as CssColors,
    Green:		"#00FF00" as CssColors,
    DarkGreen:	"#008000" as CssColors,
    Orange:		"#FFA500" as CssColors,
    DarkOrange: "#B27300" as CssColors,
    Purple:     "#CC99CC" as CssColors,
    DarkPurple: "#800080" as CssColors
};


//Node Status Color
export type CssStatusColors = "#AAD5FF" | "#FFF06C" | "#ADFF2F" | "#CFA0FF" | "#D1CECD" | "#FF8C94";

export const CssStatusColors = {
    New : "#AAD5FF" as CssStatusColors,
    InProgress : "#FFF06C" as CssStatusColors,
    Done : "#ADFF2F" as CssStatusColors,
    Complete : "#CFA0FF" as CssStatusColors,
    Stop : "#D1CECD" as CssStatusColors,
    Block : "#FF8C94" as CssStatusColors
};