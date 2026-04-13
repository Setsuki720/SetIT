let engineer = (spec,age, aduc, about, img)=> {
    return (
        `
        <h1>Привет, ${spec}</h1>
        <h2>age - ${age}</h2>
        <h2>aducation - ${aduc}</h2>
        <h2>aboutME --- ${about}</h2>
        <img src="${img}" alt="qwe">
        `
    )
}
export default engineer