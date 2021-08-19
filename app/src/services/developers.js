import Api from "./api";

const DevelopersService = {
    getFiltered: async (params) => {
        const response = await Api.get('/developers', params);
        console.log(response);
    },
};

export default DevelopersService;