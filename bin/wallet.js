"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
const nem_library_1 = require("nem-library");
const fs = require('fs');
const os = require('os');
const prompt = require('prompt');
const args = process.argv.slice(2);
const PATH_HOME = `${os.homedir()}/${src_1.MOSAIC_NAME}-wallets-dev`;
const PATH_WALLET = `${PATH_HOME}/${src_1.MOSAIC_NAME}-wallet.wlt`;
const openWallet = (wallet) => {
    return new Promise((resolve, reject) => {
        prompt.message = 'wallet login';
        prompt.start();
        prompt.get({
            properties: {
                password: {
                    description: 'Password',
                    hidden: true
                }
            }
        }, (_, result) => {
            const pass = new nem_library_1.Password(result.password);
            try {
                resolve(wallet.open(pass));
            }
            catch (err) {
                console.log(`${err}`);
                console.log('Please try again');
                reject();
            }
        });
    });
};
const loadWallet = () => {
    const contents = fs.readFileSync(PATH_WALLET);
    return nem_library_1.SimpleWallet.readFromWLT(contents);
};
const downloadWallet = (wallet) => {
    console.log('\nDownloading wallet for your convenience. \n' +
        'Please store someplace safe. The private key is encrypted by your password.\n' +
        'To load this wallet on a new computer you would simply import the .wlt file into this app and enter your password and you will be able to sign transactions');
    if (!fs.existsSync(PATH_HOME)) {
        fs.mkdirSync(PATH_HOME);
    }
    let fullPath = PATH_WALLET;
    if (fs.existsSync(fullPath)) {
        const stamp = new Date().toISOString();
        fullPath = `${PATH_HOME}/${stamp}-${src_1.MOSAIC_NAME}-wallet.wlt`;
    }
    fs.writeFileSync(fullPath, wallet.writeWLTFile());
    console.log(`Downloaded wallet to ${fullPath}`);
};
const createWallet = () => {
    console.log('Please Enter a unique Password (8 Character minimum ).\n' +
        'This password will be used to encrypt your private key and make working with wallet easier.\n' +
        'Store this password somewhere safe. If you lose or forget it you will never be able to transfer funds');
    prompt.message = `${src_1.MOSAIC_NAME} wallet`;
    prompt.start();
    prompt.get({
        properties: {
            password: {
                description: 'Password',
                hidden: true
            },
            confirmPass: {
                description: 'Re-enter password',
                hidden: true
            }
        }
    }, (_, result) => {
        if (result.password !== result.confirmPass) {
            console.log('\nPasswords do not match\n\n');
            createWallet();
        }
        else {
            const wallet = src_1.createSimpleWallet(result.password);
            const pass = new nem_library_1.Password(result.password);
            const account = wallet.open(pass);
            const address = account.address.pretty();
            console.log(`${src_1.MOSAIC_NAME} wallet successfully created\n`);
            console.log(`You can now start sending and receiving ${src_1.MOSAIC_NAME}\n`);
            console.log(`Public Address: ${address}`);
            downloadWallet(wallet);
        }
    });
};
const printBalance = (account) => __awaiter(this, void 0, void 0, function* () {
    const balances = yield src_1.getAccountBalances(account);
    const mosaic = src_1.mosaicBalance(balances);
    const xem = src_1.xemBalance(balances);
    const address = account.address.pretty();
    const bal = (mosaic / 1e6).toString();
    const xemBal = (xem / 1e6).toString();
    console.log(`Khanani: ${bal}`);
    console.log(`XEM: ${xemBal}`);
    console.log(`Public Address: ${address}`);
});
const main = () => __awaiter(this, void 0, void 0, function* () {
    if (args[0] === 'wallet') {
        if (args[1] === 'create') {
            createWallet();
        }
    }
    else if (args[0] === 'balance') {
        try {
            const wallet = loadWallet();
            const account = yield openWallet(wallet);
            printBalance(account);
        }
        catch (err) {
            console.log(err);
        }
    }
});
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbGV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid2FsbGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxnQ0FBd0c7QUFDeEcsNkNBQThEO0FBRzlELE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QixNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFekIsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2pDLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ25DLE1BQU0sU0FBUyxHQUFHLEdBQUcsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLGlCQUFXLGNBQWMsQ0FBQztBQUMvRCxNQUFNLFdBQVcsR0FBRyxHQUFHLFNBQVMsSUFBSSxpQkFBVyxhQUFhLENBQUM7QUFFN0QsTUFBTSxVQUFVLEdBQUcsQ0FBQyxNQUFvQixFQUFvQixFQUFFO0lBQzFELE9BQU8sSUFBSSxPQUFPLENBQVUsQ0FBQyxPQUFPLEVBQUMsTUFBTSxFQUFFLEVBQUU7UUFDM0MsTUFBTSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7UUFDaEMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2YsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUNQLFVBQVUsRUFBQztnQkFDUCxRQUFRLEVBQUM7b0JBQ0wsV0FBVyxFQUFFLFVBQVU7b0JBQ3ZCLE1BQU0sRUFBRSxJQUFJO2lCQUNmO2FBQ0o7U0FDSixFQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ1osTUFBTSxJQUFJLEdBQUcsSUFBSSxzQkFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMzQyxJQUFHO2dCQUNDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7YUFD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QUFNLENBQUMsQ0FBQztZQUN6QyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7U0FFekI7UUFBQyxPQUFNLEdBQUcsRUFBQztZQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDcEI7S0FFSjtBQUtMLENBQUMsQ0FBQSxDQUFDO0FBRUYsSUFBSSxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNT1NBSUNfTkFNRSwgY3JlYXRlU2ltcGxlV2FsbGV0LCBnZXRBY2NvdW50QmFsYW5jZXMsIG1vc2FpY0JhbGFuY2UsIHhlbUJhbGFuY2UgfSBmcm9tIFwiLi4vc3JjXCI7XG5pbXBvcnQgeyBQYXNzd29yZCwgU2ltcGxlV2FsbGV0LCBBY2NvdW50IH0gZnJvbSAnbmVtLWxpYnJhcnknO1xuXG5cbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcbmNvbnN0IG9zID0gcmVxdWlyZSgnb3MnKTtcblxuY29uc3QgcHJvbXB0ID0gcmVxdWlyZSgncHJvbXB0Jyk7XG5jb25zdCBhcmdzID0gcHJvY2Vzcy5hcmd2LnNsaWNlKDIpO1xuY29uc3QgUEFUSF9IT01FID0gYCR7b3MuaG9tZWRpcigpfS8ke01PU0FJQ19OQU1FfS13YWxsZXRzLWRldmA7XG5jb25zdCBQQVRIX1dBTExFVCA9IGAke1BBVEhfSE9NRX0vJHtNT1NBSUNfTkFNRX0td2FsbGV0LndsdGA7XG5cbmNvbnN0IG9wZW5XYWxsZXQgPSAod2FsbGV0OiBTaW1wbGVXYWxsZXQpOiBQcm9taXNlPEFjY291bnQ+ID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8QWNjb3VudD4oKHJlc29sdmUscmVqZWN0KSA9PiB7XG4gICAgICAgIHByb21wdC5tZXNzYWdlID0gJ3dhbGxldCBsb2dpbic7XG4gICAgICAgIHByb21wdC5zdGFydCgpO1xuICAgICAgICBwcm9tcHQuZ2V0KHtcbiAgICAgICAgICAgIHByb3BlcnRpZXM6e1xuICAgICAgICAgICAgICAgIHBhc3N3b3JkOntcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdQYXNzd29yZCcsXG4gICAgICAgICAgICAgICAgICAgIGhpZGRlbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwoXywgcmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYXNzID0gbmV3IFBhc3N3b3JkKHJlc3VsdC5wYXNzd29yZCk7XG4gICAgICAgICAgICB0cnl7IFxuICAgICAgICAgICAgICAgIHJlc29sdmUod2FsbGV0Lm9wZW4ocGFzcykpO1xuICAgICAgICAgICAgfSBjYXRjaChlcnIpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke2Vycn1gKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUGxlYXNlIHRyeSBhZ2FpbicpO1xuICAgICAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICB9KTtcbiAgICBcbn1cblxuY29uc3QgbG9hZFdhbGxldCA9ICgpIDogU2ltcGxlV2FsbGV0ID0+IHtcbiAgICBjb25zdCBjb250ZW50cyA9IGZzLnJlYWRGaWxlU3luYyhQQVRIX1dBTExFVCk7XG4gICAgcmV0dXJuIFNpbXBsZVdhbGxldC5yZWFkRnJvbVdMVChjb250ZW50cyk7XG59O1xuXG5jb25zdCBkb3dubG9hZFdhbGxldCA9ICh3YWxsZXQ6IFNpbXBsZVdhbGxldCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdcXG5Eb3dubG9hZGluZyB3YWxsZXQgZm9yIHlvdXIgY29udmVuaWVuY2UuIFxcbicgKyBcbiAgICAnUGxlYXNlIHN0b3JlIHNvbWVwbGFjZSBzYWZlLiBUaGUgcHJpdmF0ZSBrZXkgaXMgZW5jcnlwdGVkIGJ5IHlvdXIgcGFzc3dvcmQuXFxuJytcbiAgICAnVG8gbG9hZCB0aGlzIHdhbGxldCBvbiBhIG5ldyBjb21wdXRlciB5b3Ugd291bGQgc2ltcGx5IGltcG9ydCB0aGUgLndsdCBmaWxlIGludG8gdGhpcyBhcHAgYW5kIGVudGVyIHlvdXIgcGFzc3dvcmQgYW5kIHlvdSB3aWxsIGJlIGFibGUgdG8gc2lnbiB0cmFuc2FjdGlvbnMnKTtcbiAgICBcblxuICAgIGlmKCFmcy5leGlzdHNTeW5jKFBBVEhfSE9NRSkpe1xuICAgICAgICBmcy5ta2RpclN5bmMoUEFUSF9IT01FKTtcbiAgICB9XG4gICAgbGV0IGZ1bGxQYXRoID0gUEFUSF9XQUxMRVQ7XG4gICAgaWYoZnMuZXhpc3RzU3luYyhmdWxsUGF0aCkpe1xuICAgICAgICBjb25zdCBzdGFtcCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTsgXG4gICAgICAgIGZ1bGxQYXRoID0gYCR7UEFUSF9IT01FfS8ke3N0YW1wfS0ke01PU0FJQ19OQU1FfS13YWxsZXQud2x0YDsgICAgXG4gICAgfVxuICAgIGZzLndyaXRlRmlsZVN5bmMoZnVsbFBhdGgsIHdhbGxldC53cml0ZVdMVEZpbGUoKSk7XG4gICAgY29uc29sZS5sb2coYERvd25sb2FkZWQgd2FsbGV0IHRvICR7ZnVsbFBhdGh9YCk7XG59O1xuXG5jb25zdCBjcmVhdGVXYWxsZXQgPSAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ1BsZWFzZSBFbnRlciBhIHVuaXF1ZSBQYXNzd29yZCAoOCBDaGFyYWN0ZXIgbWluaW11bSApLlxcbicrXG4gICAgJ1RoaXMgcGFzc3dvcmQgd2lsbCBiZSB1c2VkIHRvIGVuY3J5cHQgeW91ciBwcml2YXRlIGtleSBhbmQgbWFrZSB3b3JraW5nIHdpdGggd2FsbGV0IGVhc2llci5cXG4nK1xuICAgICdTdG9yZSB0aGlzIHBhc3N3b3JkIHNvbWV3aGVyZSBzYWZlLiBJZiB5b3UgbG9zZSBvciBmb3JnZXQgaXQgeW91IHdpbGwgbmV2ZXIgYmUgYWJsZSB0byB0cmFuc2ZlciBmdW5kcycpO1xuICAgIHByb21wdC5tZXNzYWdlID0gYCR7TU9TQUlDX05BTUV9IHdhbGxldGA7XG4gICAgcHJvbXB0LnN0YXJ0KCk7XG4gICAgcHJvbXB0LmdldCh7XG4gICAgICBwcm9wZXJ0aWVzOiAge1xuICAgICAgICAgICAgcGFzc3dvcmQ6IHtcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1Bhc3N3b3JkJyxcbiAgICAgICAgICAgICAgICBoaWRkZW46IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb25maXJtUGFzczoge1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnUmUtZW50ZXIgcGFzc3dvcmQnLFxuICAgICAgICAgICAgICAgIGhpZGRlbjogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSwgKF8scmVzdWx0KSA9PiB7XG4gICAgICAgIGlmKHJlc3VsdC5wYXNzd29yZCAhPT0gcmVzdWx0LmNvbmZpcm1QYXNzKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdcXG5QYXNzd29yZHMgZG8gbm90IG1hdGNoXFxuXFxuJyk7XG4gICAgICAgICAgICBjcmVhdGVXYWxsZXQoKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjb25zdCB3YWxsZXQgPSBjcmVhdGVTaW1wbGVXYWxsZXQocmVzdWx0LnBhc3N3b3JkKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cod2FsbGV0KTtcbiAgICAgICAgICAgIGNvbnN0IHBhc3MgPSBuZXcgUGFzc3dvcmQocmVzdWx0LnBhc3N3b3JkKTtcbiAgICAgICAgICAgIGNvbnN0IGFjY291bnQgPSB3YWxsZXQub3BlbihwYXNzKTtcbiAgICAgICAgICAgIGNvbnN0IGFkZHJlc3MgPSBhY2NvdW50LmFkZHJlc3MucHJldHR5KCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgJHtNT1NBSUNfTkFNRX0gd2FsbGV0IHN1Y2Nlc3NmdWxseSBjcmVhdGVkXFxuYCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgWW91IGNhbiBub3cgc3RhcnQgc2VuZGluZyBhbmQgcmVjZWl2aW5nICR7TU9TQUlDX05BTUV9XFxuYCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUHVibGljIEFkZHJlc3M6ICR7YWRkcmVzc31gKTtcbiAgICAgICAgICAgIGRvd25sb2FkV2FsbGV0KHdhbGxldCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cblxuY29uc3QgcHJpbnRCYWxhbmNlID0gYXN5bmMgKGFjY291bnQ6IEFjY291bnQpID0+IHtcbiAgICBjb25zdCBiYWxhbmNlcyA9IGF3YWl0IGdldEFjY291bnRCYWxhbmNlcyhhY2NvdW50KTtcbiAgICBjb25zdCBtb3NhaWMgPSAgbW9zYWljQmFsYW5jZShiYWxhbmNlcyk7XG4gICAgY29uc3QgeGVtID0geGVtQmFsYW5jZShiYWxhbmNlcyk7XG4gICAgY29uc3QgYWRkcmVzcyA9IGFjY291bnQuYWRkcmVzcy5wcmV0dHkoKTtcbiAgICBjb25zdCBiYWwgPSAobW9zYWljLyAxZTYpLnRvU3RyaW5nKCk7XG4gICAgY29uc3QgeGVtQmFsID0gKHhlbS8gMWU2KS50b1N0cmluZygpO1xuXG4gICAgY29uc29sZS5sb2coYEtoYW5hbmk6ICR7YmFsfWApO1xuICAgIGNvbnNvbGUubG9nKGBYRU06ICR7eGVtQmFsfWApO1xuICAgIGNvbnNvbGUubG9nKGBQdWJsaWMgQWRkcmVzczogJHthZGRyZXNzfWApO1xufTtcblxuY29uc3QgbWFpbiA9IGFzeW5jICgpID0+IHtcbiAgICBpZihhcmdzWzBdID09PSAnd2FsbGV0Jyl7XG4gICAgICAgIGlmKGFyZ3NbMV0gPT09ICdjcmVhdGUnKXtcbiAgICAgICAgICAgIGNyZWF0ZVdhbGxldCgpO1xuICAgICAgICB9XG4gICAgfWVsc2UgaWYoYXJnc1swXSA9PT0gJ2JhbGFuY2UnKXtcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgY29uc3Qgd2FsbGV0ID0gbG9hZFdhbGxldCgpO1xuICAgICAgICAgICAgY29uc3QgYWNjb3VudCA9IGF3YWl0IG9wZW5XYWxsZXQod2FsbGV0KTsgICAgXG4gICAgICAgICAgICBwcmludEJhbGFuY2UoYWNjb3VudCk7XG4gICAgICAgICAgICBcbiAgICAgICAgfSBjYXRjaChlcnIpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICAvLyBjb25zdCB3YWxsZXQgPSBsb2FkV2FsbGV0KCk7XG4gICAgLy8gY29uc3QgYWNjb3VudCA9IGF3YWl0IG9wZW5XYWxsZXQod2FsbGV0KTtcbiAgICAvLyBjb25zb2xlLmxvZyhhY2NvdW50KTtcbn07XG5cbm1haW4oKTsiXX0=