import { createConnection } from 'typeorm';
import { Cocktail } from '../entities/Cocktail';
import { Component } from '../entities/Component';
import { Drink } from '../entities/Drink';
import { Pipe } from '../entities/Pipe';
import { connectionOptions } from '../ormconfig';

export class DefaultData {
  async run() {
    const dbConnection = await createConnection(connectionOptions);
    const drinksRepo = dbConnection.getRepository(Drink);
    const cocktailRepo = dbConnection.getRepository(Cocktail);
    const componentRepo = dbConnection.getRepository(Component);
    const pipeRepo = dbConnection.getRepository(Pipe);

    await drinksRepo.createQueryBuilder().delete().execute();
    const [gin, vodka, tonik, vermout, grenadine, appleJuice] = await drinksRepo.save([
      {
        name: 'Gin',
        capacity:  33
      },
      {
        name: 'Vodka',
        capacity:  33
      },
      {
        name: 'Tonic',
        capacity:  33
      },
      {
        name: 'Vermout',
        capacity:  33
      },
      {
        name: 'Syrop Grenadine',
        capacity:  33
      },
      {
        name: 'Apple juice',
        capacity:  33
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


      {
        drink: vermout,
        cocktail: biancoTonic,
        amount: 100
      },
      {
        drink: tonik,
        cocktail: biancoTonic,
        amount: 100
      },


      {
        drink: vodka,
        cocktail: dateOnTheBich,
        amount: 100
      },
      {
        drink: tonik,
        cocktail: dateOnTheBich,
        amount: 100
      },
      {
        drink: appleJuice,
        cocktail: dateOnTheBich,
        amount: 100
      },
      {
        drink: grenadine,
        cocktail: dateOnTheBich,
        amount: 100
      },


      {
        drink: gin,
        cocktail: untitledRealm,
        amount: 100
      },
      {
        drink: vodka,
        cocktail: untitledRealm,
        amount: 100
      },
      {
        drink: appleJuice,
        cocktail: untitledRealm,
        amount: 100
      },


    ]);

    await pipeRepo.createQueryBuilder().delete().execute();

    await pipeRepo.save([
      {
        drink: gin
      },
      {
        drink: vodka
      },
      {
        drink: tonik
      },
      {
        drink: vermout
      },
      {
        drink: grenadine
      },
      {
        drink: appleJuice
      },
    ]);

  }
}

(async () => {
  await new DefaultData().run();
})();
