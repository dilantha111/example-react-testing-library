export const getMetalGenres = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(
                [
                    "Thrash metal",
                    "Glam metal",
                    "Gothic metal",
                    "Grindcore",
                    "Power metal",
                    "Blackened death metal",
                    "Death metal",
                    "Doom metal",
                    "Celtic metal",
                    "Folk metal",
                    "Nu metal"
                ]
            );
        }, 1000);
    });
};