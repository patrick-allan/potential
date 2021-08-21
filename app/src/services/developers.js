import Api from "./api";

const DevelopersService = {
    getFiltered: async (params) => {
        const response = await Api.get('/developers?'+params);
        return response;
    },
    include: async (params) => {         
        try {
            const response = await Api.post('/developers', params);            
            if (response.status === 201){
                return {'type': 'success', 'message': 'Developer incluido com sucesso.'};
            } else{
                return {'type':'fail', 'message':  'não foi possível incluir o Developer.'};
            }            
        } catch (error) {            
            if (error.response) {                
                return {'type':'fail', 'message':  error.response.data};
                //console.log(error.response.data);
                //console.log(error.response.status);
                //console.log(error.response.headers);
            } else if (error.request) {                
                return {'type':'fail', 'message':  'não foi possível incluir o Developer.'};
            } else {                
                return {'type':'fail', 'message':  'não foi possível incluir o Developer.'};
            }            
        }       
    }, 
    delete: async (id) => {
        const response = await Api.delete('/developers/' + id);
        return response;
    },
};

export default DevelopersService;