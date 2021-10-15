
export const api = process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8000/api'
    : '/api'

export const generatePublicUrl = (fileName) => {
    // console.log(process.env.NODE_ENV);    
    const location = process.env.NODE_ENV !== 'production'
        ? `http://localhost:8000/public/${fileName}`
        : `/public/${fileName}`
    return location;
}


