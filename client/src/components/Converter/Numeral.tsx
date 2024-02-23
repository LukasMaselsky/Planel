export type NumeralUnits = "dec" | "oct" | "bin" | "hex";
type Conversions = {
    [key in NumeralUnits]: string;
};

const isHex = (val: string): boolean => {
    return Boolean(val.match(/^([0-9A-Fa-f])+$/));
};

const isOct = (val: string): boolean => {
    return Boolean(val.match(/^([0-7])+$/));
};

const isBin = (val: string): boolean => {
    return Boolean(val.match(/^([0-1])+$/));
};

const isDec = (val: string): boolean => {
    return Boolean(val.match(/^([0-9])+$/));
};

const fromDec = (value: string, to: NumeralUnits) => {
    if (value == "") return "0";

    if (isDec(value)) {
        const conversions: Conversions = {
            dec: value,
            oct: (Number(value) >>> 0).toString(8),
            bin: (Number(value) >>> 0).toString(2),
            hex: (Number(value) >>> 0).toString(16),
        };
        return conversions[to];
    }
};

const fromHex = (value: string, to: NumeralUnits) => {
    if (value == "") return "0";

    if (isHex(value)) {
        const conversions: Conversions = {
            dec: String(parseInt(value, 16)),
            oct: parseInt(value, 16).toString(8),
            bin: parseInt(value, 16).toString(2),
            hex: value,
        };

        return conversions[to];
    }
};

const fromBin = (value: string, to: NumeralUnits) => {
    if (value == "") return "0";

    if (isBin(value)) {
        const conversions: Conversions = {
            dec: String(parseInt(value, 2)),
            oct: parseInt(value, 2).toString(8),
            bin: value,
            hex: parseInt(value, 2).toString(16),
        };

        return conversions[to];
    }
};

const fromOct = (value: string, to: NumeralUnits) => {
    if (value == "") return "0";

    if (isOct(value)) {
        const conversions: Conversions = {
            dec: String(parseInt(value, 8)),
            oct: value,
            bin: parseInt(value, 8).toString(2),
            hex: parseInt(value, 8).toString(16),
        };

        return conversions[to];
    }
};

export const NumeralConverters = {
    dec: fromDec,
    hex: fromHex,
    bin: fromBin,
    oct: fromOct,
};
