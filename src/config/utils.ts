export function prepareObject<T>(source: any[], destination: new () => T, dobj: any, extension = {}) {

    const propNames = Object.getOwnPropertyNames(new destination());

    let output = {};
    let combinedSource = {}
    source.forEach(obj => combinedSource = { ...combinedSource, ...obj });

    propNames.forEach(propName => {
        if ((propName === 'id' || propName === 'updatedAt' || propName === 'createdAt') && dobj) {
            output = { ...output, [propName]: dobj[propName] }
        } else {
            output = { ...output, [propName]: (combinedSource as any)[propName] }
        }
    });

    output = { ...output, ...extension }

    return output as T;
}