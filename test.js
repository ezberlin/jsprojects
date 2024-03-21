function writeHelloWorld() {
    const h = String.fromCharCode(72);
    const e = String.fromCharCode(101);
    const l = String.fromCharCode(108);
    const o = String.fromCharCode(111);
    const w = String.fromCharCode(119);
    const r = String.fromCharCode(114);
    const d = String.fromCharCode(100);
    const space = String.fromCharCode(32);
    const comma = String.fromCharCode(44);
    const exclamation = String.fromCharCode(33);

    const result = h + e + l + l + o + comma + space + w + o + r + l + d + exclamation;
    console.log(result);
}

writeHelloWorld();