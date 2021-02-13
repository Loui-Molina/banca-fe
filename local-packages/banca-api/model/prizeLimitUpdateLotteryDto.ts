/**
 * Betting
 * Betting for Republic
 *
 * The version of the OpenAPI document: 1.0.3
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface PrizeLimitUpdateLotteryDto { 
    playType?: PrizeLimitUpdateLotteryDto.PlayTypeEnum;
    paymentAmount?: number;
    status?: boolean;
}
export namespace PrizeLimitUpdateLotteryDto {
    export type PlayTypeEnum = 'first' | 'second' | 'third' | 'double' | 'pale' | 'paleTwoThree' | 'triplet' | 'twoNumbers' | 'superPale' | 'cashThreeStraight' | 'cashThreeStraightDoubles' | 'playFourStraight' | 'pickFiveStraight' | 'cashThreeBoxThreeWay' | 'cashThreeBoxSixWay' | 'playFourBoxFourWay' | 'playFourBoxSixWay' | 'playFourBoxTwelfthWay' | 'playFourBoxTwentyFourthWay' | 'pickFiveBoxFifthWay' | 'pickFiveBoxTenthWay' | 'pickFiveBoxTwentiethWay' | 'pickFiveBoxThirtiethWay' | 'pickFiveBoxSixtiethWay' | 'pickFiveBoxOneHundredTwentiethWay' | 'singulationOne' | 'singulationTwo' | 'singulationThree' | 'bolitaOne' | 'bolitaTwo';
    export const PlayTypeEnum = {
        First: 'first' as PlayTypeEnum,
        Second: 'second' as PlayTypeEnum,
        Third: 'third' as PlayTypeEnum,
        Double: 'double' as PlayTypeEnum,
        Pale: 'pale' as PlayTypeEnum,
        PaleTwoThree: 'paleTwoThree' as PlayTypeEnum,
        Triplet: 'triplet' as PlayTypeEnum,
        TwoNumbers: 'twoNumbers' as PlayTypeEnum,
        SuperPale: 'superPale' as PlayTypeEnum,
        CashThreeStraight: 'cashThreeStraight' as PlayTypeEnum,
        CashThreeStraightDoubles: 'cashThreeStraightDoubles' as PlayTypeEnum,
        PlayFourStraight: 'playFourStraight' as PlayTypeEnum,
        PickFiveStraight: 'pickFiveStraight' as PlayTypeEnum,
        CashThreeBoxThreeWay: 'cashThreeBoxThreeWay' as PlayTypeEnum,
        CashThreeBoxSixWay: 'cashThreeBoxSixWay' as PlayTypeEnum,
        PlayFourBoxFourWay: 'playFourBoxFourWay' as PlayTypeEnum,
        PlayFourBoxSixWay: 'playFourBoxSixWay' as PlayTypeEnum,
        PlayFourBoxTwelfthWay: 'playFourBoxTwelfthWay' as PlayTypeEnum,
        PlayFourBoxTwentyFourthWay: 'playFourBoxTwentyFourthWay' as PlayTypeEnum,
        PickFiveBoxFifthWay: 'pickFiveBoxFifthWay' as PlayTypeEnum,
        PickFiveBoxTenthWay: 'pickFiveBoxTenthWay' as PlayTypeEnum,
        PickFiveBoxTwentiethWay: 'pickFiveBoxTwentiethWay' as PlayTypeEnum,
        PickFiveBoxThirtiethWay: 'pickFiveBoxThirtiethWay' as PlayTypeEnum,
        PickFiveBoxSixtiethWay: 'pickFiveBoxSixtiethWay' as PlayTypeEnum,
        PickFiveBoxOneHundredTwentiethWay: 'pickFiveBoxOneHundredTwentiethWay' as PlayTypeEnum,
        SingulationOne: 'singulationOne' as PlayTypeEnum,
        SingulationTwo: 'singulationTwo' as PlayTypeEnum,
        SingulationThree: 'singulationThree' as PlayTypeEnum,
        BolitaOne: 'bolitaOne' as PlayTypeEnum,
        BolitaTwo: 'bolitaTwo' as PlayTypeEnum
    };
}


