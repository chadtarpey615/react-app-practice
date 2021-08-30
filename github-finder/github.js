class GitHub {
    constructor() {
        this.client_id = "f494767dceea753c6b60";
        this.client_secret = " 28d338a691cd9ea3d19052f254e49baa5e74991d";
    }

    async getUser(user) {
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`)

        const profile = await profileResponse.json();

        return {
            profile
        }
    }
}