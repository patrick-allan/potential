import Api from "./api";

const DevelopersService = {
    getFiltered: async (params) => {
        const response = await Api.get('/developers', params);
        return response;
    },
    include: async (params) => {
        //const response = await Api.post('/developers', params);
        //return response;
        return 'ok';
    }, 
    delete: async (id) => {
        const response = await Api.delete('/developers/' + id);
        return response;
    },
};

export default DevelopersService;