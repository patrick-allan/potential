import Api from "./api";

const DevelopersService = {
    getFiltered: async (params) => {
        const response = await Api.get('/developers?'+params);
        return response;
    },
    include: async (params) => {
        console.log(params);
        const response = await Api.post('/developers', params);
        console.log(response);
        return response;        
    }, 
    delete: async (id) => {
        const response = await Api.delete('/developers/' + id);
        return response;
    },
};

export default DevelopersService;