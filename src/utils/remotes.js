import Storage from "./Storage.js";

const apiUrl = 'https://3mawy2.pythonanywhere.com/api'
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Storage.getAccessToken()}`,
}
export const addCredentials = async (identifier, awsAccessKeyId, awsSecretAccessKey, awsDefaultRegion) => {

    try {
        const response = await fetch(`${apiUrl}/aws-credentials/add`, {
            method: 'POST',
            body: JSON.stringify({
                identifier,
                aws_access_key_id: awsAccessKeyId,
                aws_secret_access_key: awsSecretAccessKey,
                region_name: awsDefaultRegion
            }),
            headers: headers,
        });
        return {status: response.status, data: await response.json()}
    } catch (error) {
        return {status: error.status, data: error.message}
    }

}
export const getCredentials = async () => {
    try {
            const response = await fetch(`${apiUrl}/aws-credentials/`, {
                method: 'GET',
                headers: headers
            });
            return {status: response.status, data: await response.json()}

    } catch (error) {

        return {status: error.status, data: error.message}
    }
}
export const getBuckets = async (credentials) => {
    try {
        const response = await fetch(`${apiUrl}/buckets/?aws_cred=${credentials}`, {
            method: 'GET',
            headers: headers
        });
        return {status: response.status, data: await response.json()}
    } catch (error) {
        return {status: 500, error: error}
    }
}
export const getObjects = async (credentials, bucketName, prefix, nextMarker = '',) => {

    try {
        const response = await fetch(`${apiUrl}/buckets/${bucketName}/folders?aws_cred=${credentials}&next_marker=${nextMarker}&prefix=${prefix}`, {
            method: 'GET',
            headers: headers
        });

        return {status: response.status, data: await response.json()}
    } catch (error) {

        return {status: error.status, data: error.message}
    }
}
export const getObjectsMetadata = async (credentials) => {

    try {
        const response = await fetch(`${apiUrl}/objects/metadata?aws_cred=${credentials}`, {
            method: 'GET',
            headers: headers
        });

        return {status: response.status, data: await response.json()}
    } catch (error) {

        return {status: error.status, data: error.message}
    }
}
export const getObjectPresignedUrl = async (credentials, bucketName, objectKey) => {
    try {
        const response = await fetch(`${apiUrl}/buckets/${bucketName}/objects/get_presigned_url?aws_cred=${credentials}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({"object_key": objectKey})
        });

        return {status: response.status, data: await response.json()}
    } catch (error) {

        return {status: error.status, data: error.message}
    }
}
export const getObjectStats = async (credentials) => {
    try {
        const response = await fetch(`${apiUrl}/objects/metadata?aws_cred=${credentials}`, {
            method: 'GET',
            headers: headers,
        });

        return {status: response.status, data: await response.json()}
    } catch (error) {

        return {status: error.status, data: error.message}
    }
}
export const getTaskStatus = async (task) => {
    try {
        const response = await fetch(`${apiUrl}/check_task_status/${task}`, {
            method: 'GET',
            headers: headers,
        });

        return {status: response.status, data: await response.json()}
    } catch (error) {

        return {status: error.status, data: error.message}
    }
}