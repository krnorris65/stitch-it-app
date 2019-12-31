const remoteURL = "http://localhost:5002"

export default {
    getOne(resource, id, parameters) {
        if(resource === "designs") {
            parameters += "&_expand=fabric&_expand=finishedSize"
        }
        return fetch(`${remoteURL}/${resource}/${id}?${parameters}`)
            .then(response => response.json())
    },
    getAll(resource, parameters) {
        if(resource === "designs") {
            parameters += "&_expand=fabric&_expand=finishedSize"
        }
        return fetch(`${remoteURL}/${resource}?${parameters}`)
            .then(response => response.json())
    },
    delete(resource, id) {
        return fetch(`${remoteURL}/${resource}/${id}`, {
            method: "DELETE"
        })
            .then(response => response.json())
    },
    post(resource, newObj) {
        return fetch(`${remoteURL}/${resource}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newObj)
        })
            .then(response => response.json())
    },
    update(resource, editedObj) {
        return fetch(`${remoteURL}/${resource}/${editedObj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedObj)
        })
            .then(response => response.json())
    }
}