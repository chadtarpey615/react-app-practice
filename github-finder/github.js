class GitHub {
    constructor() {
        this.client_id = "f494767dceea753c6b60";
        this.client_secret = " 28d338a691cd9ea3d19052f254e49baa5e74991d";
        this.repos_count = 5;
        this.repo_sort = "created: asc";
    }

    async getUser(user) {
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`)
        const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repo_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`)


        const profile = await profileResponse.json();
        const repos = await repoResponse.json();
        console.log(this.client_id)

        return {
            profile,
            repos
        }
    }


}