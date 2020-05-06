class CrowdSourcingClient {
    constructor(useHttps) {
        this.apiEndpoint = (useHttps ? "https" : "http") +
            "://crowdsourcing.sinelki.com:" +
            (useHttps ? "60985": "60984") +
            "/api/"
        this.headers = { 'Content-Type': 'application/json' }
    }

    GetTasks(n) {
        return fetch(this.apiEndpoint + "tasks/?number=" + n, {
            headers: this.headers
        })
    }

    GetMedia(mediaId) {
        return fetch(this.apiEndpoint + "tasks/media/?mediaId=" + mediaId, {
            headers: { 'Content-Type': 'video/mp4' }
        })
    }

    PostWorker(workerId) {
        return fetch(this.apiEndpoint + "tasks/metadata/?id=" + workerId, {
            method: 'POST',
            headers: this.headers
        })
    }

    PostTasks(tasks, workerId, assignmentId) {
        return fetch(this.apiEndpoint + "tasks/?workerId=" + workerId + "&assignmentId=" + assignmentId, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(tasks)
        })
    }

    GetPractice() {
       return fetch(this.apiEndpoint + "tasks/practice/", {
           headers: this.headers
       })
    }

    PostPractice(task, section) {
        return fetch(this.apiEndpoint + "tasks/practice/?section=" + section, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(task)
        })
    }

    PostMetadata(workerId, meta) {
        return fetch(this.apiEndpoint + "tasks/worker/?id=" + workerId, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(meta)
        })
    }
}
