import Api from "./api";

const DevelopersService = {
    getFiltered: async (params) => {
        const response = await Api.get('/developers', params);
    },
    delete: async (id) => {
        const response = await Api.delete('/developers/' + id);
    },
    info: async (id) => {
        const response = await Api.get('/developers/' + id);
        return response;
    },
};

export default DevelopersService;