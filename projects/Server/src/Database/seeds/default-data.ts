import { createConnection } from 'typeorm';
import { Cocktail } from '../entities/Cocktail';
import { Component } from '../entities/Component';
import { Drink } from '../entities/Drink';
import connectionOptions from '../ormconfig';

export class DefaultData {
  async run() {
    const dbConnection = await createConnection(connectionOptions);
    const drinksRepo = dbConnection.getRepository(Drink);
    const cocktailRepo = dbConnection.getRepository(Cocktail);
    const componentRepo = dbConnection.getRepository(Component);

    await drinksRepo.createQueryBuilder().delete().execute();
    const [gin, vodka, tonik, vermout, grenadine, appleJuice] = await drinksRepo.save([
      {
        name: 'Gin',
        capacity: 100
      },
      {
        name: 'Vodka',
        capacity: 100
      },
      {
        name: 'Tonic',
        capacity: 100
      },
      {
        name: 'Vermout',
        capacity: 100
      },
      {
        name: 'Syrop Grenadine',
        capacity: 100
      },
      {
        name: 'Apple juice',
        capacity: 100
      }
    ]);

    await cocktailRepo.createQueryBuilder().delete().execute();

    const [ginTonik, dryMartiny, Screwdriver, vodkaMartiny, vesper, cristina, paradise, biancoTonic, dateOnTheBich, untitledRealm] = await cocktailRepo.save([
      {
        name: 'Gin Tonic'
      },
      {
        name: 'Dry Martini'
      },
      {
        name: 'Screwdriver'
      },
      {
        name: 'Vodka martini'
      },
      {
        name: 'Vesper'
      },
      {
        name: 'Cristina'
      },
      {
        name: 'Paradise'
      },
      {
        name: 'Bianco Tonic'
      },
      {
        name: 'Date on the beach'
      },
      {
        name: 'Untitled Realm'
      },
    ]);

    await componentRepo.createQueryBuilder().delete().execute();

    await componentRepo.save([
      {
        drink: gin,
        cocktail: ginTonik,
        amount: 100
      },
      {
        drink: tonik,
        cocktail: ginTonik,
        amount: 100
      },


      {
        drink: gin,
        cocktail: dryMartiny,
        amount: 100
      },
      {
        drink: vermout,
        cocktail: dryMartiny,
        amount: 100
      },


      {
        drink: vodka,
        cocktail: Screwdriver,
        amount: 100
      },
      {
        drink: appleJuice,
        cocktail: Screwdriver,
        amount: 100
      },


      {
        drink: vodka,
        cocktail: vodkaMartiny,
        amount: 100
      },
      {
        drink: vermout,
        cocktail: vodkaMartiny,
        amount: 100
      },


      {
        drink: gin,
        cocktail: vesper,
        amount: 100
      },
      {
        drink: vermout,
        cocktail: vesper,
        amount: 100
      },
      {
        drink: vodka,
        cocktail: vesper,
        amount: 100
      },


      {
        cocktail: cristina,
        drink: tonik,
        amount: 100
      },
      {
        drink: vermout,
        cocktail: cristina,
        amount: 100
      },
      {
        drink: vodka,
        cocktail: cristina,
        amount: 100
      },
      {
        drink: grenadine,
        cocktail: cristina,
        amount: 100
      },


      {
        drink: gin,
        cocktail: paradise,
        amount: 100
      },
      {
        drink: appleJuice,
        cocktail: paradise,
        amount: 100
      },
      {
        drink: grenadine,
        cocktail: paradise,
        amount: 100
      },




    ]);
  }
}

(async () => {
  await new DefaultData().run();
})();
