# Favourite programming languages: a hacktober project

This is a collaborative project that explores the Github community's **favourite programming languages** from around the world.

### Contribution Guidelines 

To participate, create a **json** file with your first and last name in camelCase (e.g., johnSmith.json). Add the following object in your file and update it with your appropriate information:

```
{
    "gender": "m",
    "city": "Vancouver",
    "country": "Canada",
    "favLanguage": "Ruby on Rails",
    "nativeLanguage": "English",
    "age": {
        "under 20": "0",
        "20-24": "0",
        "25-29": "0",
        "30-34": "0",
        "35-39": "0",
        "40-44": "0",
        "45-49": "1",
        "50 and over": "0"
    },
    "programmingExperience": {
        "years": "0",
        "months": "6"
    }
}

```
Once you have updated your json file, add it to the `data/` directory. 

FYI - *native language* in the template json refers to *spoken language*.

### Combining all json files

When a new json file is added to `data/`, update `combinedArray.json` by running:

```
npm run start
```
This command uses [gulpfile.js](gulpfile.js) to concatenante all jsons into one combined array. 


