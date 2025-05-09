const BASE_URL = "https://sports-api.dicoding.dev";

class SportsApi {
  static async searchClub(query) {
    try {
      const response = await fetch(`${BASE_URL}/teams/search?t=${query}`);
      if (response.status >= 200 && response.status < 300) {
        const responseJson = await response.json();
        const { teams: clubs } = responseJson;
        if (clubs.length > 0) {
          return clubs;
        } else {
          throw new Error(`\`${query}\`is not found`);
        }
      } else {
        throw new Error(`Something went wrong`);
      }
    } catch (error) {
      return Promise.reject(error);
    }

    // return
    //   .then((response) => {
    //     if (response.status >= 200 && response.status < 300) {
    //       return response.json();
    //     } else {
    //       return Promise.reject(new Error(`Something went wrong`));
    //     }
    //   })
    //   .then((responseJson) => {
    //     const { teams: clubs } = responseJson;
    //     if (clubs.length > 0) {
    //       return Promise.resolve(clubs);
    //     } else {
    //       return Promise.reject(new Error(`\`${query}\` is not found`));
    //     }
    //   });
  }
}

export default SportsApi;
