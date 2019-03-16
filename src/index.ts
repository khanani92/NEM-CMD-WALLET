import {NEMLibrary, NetworkTypes, Password, SimpleWallet} from 'nem-library';

NEMLibrary.bootstrap(NetworkTypes.TEST_NET);

const createSimpleWallet = (password: string): SimpleWallet =>{
    const pass = new Password(password);

    return SimpleWallet.create('myTestWallet',pass);
};

const firstWallet = createSimpleWallet('12mySampleWallet78');
console.log(firstWallet);

const myAccount = firstWallet.open(new Password('12mySampleWallet78'));
console.log(myAccount);