
export const api = process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8000/api'
    : 'texas.houstonfarmtohome.com/api'

export const generatePublicUrl = (fileName) => {
    // console.log(process.env.NODE_ENV);    
    const location = process.env.NODE_ENV !== 'production'
        ? `http://localhost:8000/public/${fileName}`
        : `texas.houstonfarmtohome.com/public/${fileName}`
    return location;
}




