import AsyncStorage from '@react-native-async-storage/async-storage';

export const createCode = async (form) => {
    let local_err = false;
    try {
        let response = await fetch(`https://api.linketrack.com/track/json?user=teste&token=1abcd00b2731640e886fb41a8a9671ad1434c599dbaa0a0de9a5aa619f29a83f&codigo=${form.code}`);
        if (!response.ok) {
            local_err = true;
            let status = response.status
            while (status === 429) {
                // Wait for 2 seconds before the next fetch attempt
                await new Promise(resolve => setTimeout(resolve, 3100));
        
                // Fetch the data again
                response = await fetch(`https://api.linketrack.com/track/json?user=teste&token=1abcd00b2731640e886fb41a8a9671ad1434c599dbaa0a0de9a5aa619f29a83f&codigo=${form.code}`);
                status = response.status;
            }
            if (response.status === 401){
                throw new Error('Código de rastreio inválido, tente novamente')
            }else if(response.status > 300){
                throw new Error(`Erro ao buscar informações de rastreamento, tente novamente mais tarde`);
            }
        }
        const data = await response.json();
        if (data && data.eventos && data.eventos.length > 0) {
            await AsyncStorage.setItem(String(form.code), JSON.stringify(data));
        } else {
            local_err = true;
            throw new Error(`Nenhuma informação de rastreamento encontrada.`);
        }
    } catch (error) {
        if(local_err === false){
            throw new Error('Erro ao buscar informações de rastreamento, tente novamente mais tarde')
        }else{
            throw error
        }
    }
};

export const listAllCodes = async () => {
    const keys = await AsyncStorage.getAllKeys();
    if (keys.length === 0 || keys == undefined) {
        return ''
    } else{
        const items = await AsyncStorage.multiGet(keys);
        // transform it in a dictionary
        // access the last value of the "eventos"
        const itemsDicMap = items.map((item) => {
            return JSON.parse(item[1]);
        });
        const itemsDict = itemsDicMap.map((item) => {
            return {
                codigo: item.codigo,
                status: item.eventos[0].status,
                loading: false
            }
        });
        return itemsDict;
    }
}

export const listCode = async (code) => {
    if(code){
        const item = await AsyncStorage.getItem(code);

        const itemDict = JSON.parse(item);
        return itemDict['eventos'];
    }else{
        return ''
    }
}

export const deleteCode = async (code) => {
    try{
        await AsyncStorage.removeItem(code);
    }catch (error){
        return;
    }
}

export const updateItem = async (code) => {
    try {
        let response = await fetch(`https://api.linketrack.com/track/json?user=teste&token=1abcd00b2731640e886fb41a8a9671ad1434c599dbaa0a0de9a5aa619f29a83f&codigo=${code}`);
        if (!response.ok) {
            local_err = true;
            let status = response.status
            while (status === 429) {
                // Wait for 2 seconds before the next fetch attempt
                await new Promise(resolve => setTimeout(resolve, 1500));
                // Fetch the data again
                response = await fetch(`https://api.linketrack.com/track/json?user=teste&token=1abcd00b2731640e886fb41a8a9671ad1434c599dbaa0a0de9a5aa619f29a83f&codigo=${code}`);
                status = response.status;
            }
            if (response.status === 401){
                await ASyncStorage.removeItem(code);
            }else if(response.status > 300){
                await ASyncStorage.removeItem(code);
            }
        }
        const data = await response.json();
        if (data && data.eventos && data.eventos.length > 0) {
            await AsyncStorage.setItem(String(code), JSON.stringify(data));
        } else {
            local_err = true;
            await AsyncStorage.removeItem(code);
        }
    } catch (error) {
        await AsyncStorage.removeItem(code);
    }
    item = await AsyncStorage.getItem(code);
    const itemDict = JSON.parse(item);
    return {
        codigo: itemDict.codigo,
        status: itemDict.eventos[0].status,
        loading: false
    }
}