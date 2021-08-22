import Api from "./api";

const getOneError = {'type':'fail', 'message':  'não foi possível pesquisar o Developer.'};
const includeError = {'type':'fail', 'message':  'não foi possível incluir o Developer.'};
const updateError = {'type':'fail', 'message':  'não foi possível atualizar o Developer.'};

const DevelopersService = {
    getFiltered: async (params) => {
        const response = await Api.get('/developers?'+params);
        return response;
    },
    getOne: async (id) => {        
        try {
            const response = await Api.get('/developers/'+id);                        
            if (response.status === 200){
                return response;
            } else{
                return getOneError;
            } 
        } catch (error) {
            if (error.response) {
                return {'type':'fail', 'message':  error.response.data};
            } else {
                return getOneError;
            }
        }
    },
    include: async (params) => {        
        try {
            const response = await Api.post('/developers', params);
            if (response.status === 201){
                return {'type': 'success', 'message': 'Developer incluido com sucesso.'};
            } else{
                return includeError;
            }
        } catch (error) {            
            if (error.response) {                
                return {'type':'fail', 'message':  error.response.data};                
            } else {                
                return includeError;
            }            
        }       
    },
    update: async (params) => {        
        try {
            const response = await Api.put('/developers/'+params.id, params);            
            if (response.status === 200){
                return {'type': 'success', 'message': 'Developer atualizado com sucesso.'};
            } else{
                return updateError;
            }            
        } catch (error) {            
            if (error.response) {                
                return {'type':'fail', 'message':  error.response.data};                
            } else {                
                return updateError;
            }            
        }       
    }, 
    delete: async (id) => {
        const response = await Api.delete('/developers/' + id);
        return response;
    },
};

export default DevelopersService;