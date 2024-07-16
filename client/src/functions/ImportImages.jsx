// importImages.js
const importAll = (r) => {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
};

const images = importAll(require.context('../images/uploaded_images', false, /\.(png|jpe?g|svg)$/));
let imagesArray = Object.values(images)

export default imagesArray;