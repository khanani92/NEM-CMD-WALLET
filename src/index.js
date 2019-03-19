"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nem_library_1 = require("nem-library");
nem_library_1.NEMLibrary.bootstrap(nem_library_1.NetworkTypes.TEST_NET);
exports.MOSAIC_NAME = 'khanani';
exports.createSimpleWallet = (password) => {
    const pass = new nem_library_1.Password(password);
    return nem_library_1.SimpleWallet.create(`${exports.MOSAIC_NAME}-wallet`, pass);
};
exports.getAccountBalances = (account) => {
    return new Promise((resolve, reject) => {
        const accountHttp = new nem_library_1.AccountHttp();
        accountHttp.getAssetsOwnedByAddress(account.address).subscribe(mosaics => {
            resolve(mosaics);
        }, err => {
            reject(err);
        });
    });
};
exports.mosaicBalance = (balances) => {
    const found = balances.find(mosaic => {
        return mosaic.assetId.name === exports.MOSAIC_NAME;
    });
    if (!found)
        return 0;
    return found.quantity;
};
exports.xemBalance = (balances) => {
    const xemMosaic = balances.find(mosaic => {
        return mosaic.assetId.name === 'xem';
    });
    if (!xemMosaic)
        return 0;
    return xemMosaic.quantity;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUE0RztBQUc1Ryx3QkFBVSxDQUFDLFNBQVMsQ0FBQywwQkFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRS9CLFFBQUEsV0FBVyxHQUFHLFNBQVMsQ0FBQztBQUV4QixRQUFBLGtCQUFrQixHQUFHLENBQUMsUUFBZ0IsRUFBZ0IsRUFBRTtJQUNqRSxNQUFNLElBQUksR0FBRyxJQUFJLHNCQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEMsT0FBTywwQkFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHLG1CQUFXLFNBQVMsRUFBQyxJQUFJLENBQUMsQ0FBQztBQUM3RCxDQUFDLENBQUM7QUFFVyxRQUFBLGtCQUFrQixHQUFJLENBQUMsT0FBZ0IsRUFBeUIsRUFBRTtJQUMzRSxPQUFPLElBQUksT0FBTyxDQUFlLENBQUMsT0FBTyxFQUFDLE1BQU0sRUFBRSxFQUFFO1FBQ2hELE1BQU0sV0FBVyxHQUFHLElBQUkseUJBQVcsRUFBRSxDQUFDO1FBQ3RDLFdBQVcsQ0FBQyx1QkFBdUIsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3JFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyQixDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUU7WUFDTCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQztBQUVXLFFBQUEsYUFBYSxHQUFHLENBQUMsUUFBc0IsRUFBVSxFQUFFO0lBQzVELE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDakMsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxtQkFBVyxDQUFDO0lBQy9DLENBQUMsQ0FBQyxDQUFDO0lBQ0gsSUFBRyxDQUFDLEtBQUs7UUFBRSxPQUFPLENBQUMsQ0FBQztJQUNwQixPQUFPLEtBQUssQ0FBQyxRQUFRLENBQUM7QUFDMUIsQ0FBQyxDQUFDO0FBRVcsUUFBQSxVQUFVLEdBQUcsQ0FBQyxRQUFzQixFQUFVLEVBQUU7SUFDekQsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNyQyxPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQztJQUN6QyxDQUFDLENBQUMsQ0FBQztJQUNILElBQUcsQ0FBQyxTQUFTO1FBQUUsT0FBTyxDQUFDLENBQUM7SUFDeEIsT0FBTyxTQUFTLENBQUMsUUFBUSxDQUFDO0FBQzlCLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5FTUxpYnJhcnksIE5ldHdvcmtUeXBlcywgUGFzc3dvcmQsIFNpbXBsZVdhbGxldCwgQWNjb3VudCwgQWNjb3VudEh0dHAsIEFzc2V0IH0gZnJvbSAnbmVtLWxpYnJhcnknO1xuXG5cbk5FTUxpYnJhcnkuYm9vdHN0cmFwKE5ldHdvcmtUeXBlcy5URVNUX05FVCk7XG5cbmV4cG9ydCBjb25zdCBNT1NBSUNfTkFNRSA9ICdraGFuYW5pJztcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVNpbXBsZVdhbGxldCA9IChwYXNzd29yZDogc3RyaW5nKTogU2ltcGxlV2FsbGV0ID0+e1xuICAgIGNvbnN0IHBhc3MgPSBuZXcgUGFzc3dvcmQocGFzc3dvcmQpO1xuICAgIHJldHVybiBTaW1wbGVXYWxsZXQuY3JlYXRlKGAke01PU0FJQ19OQU1FfS13YWxsZXRgLHBhc3MpO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldEFjY291bnRCYWxhbmNlcyA9ICAoYWNjb3VudDogQWNjb3VudCk6IFByb21pc2U8QXJyYXk8QXNzZXQ+PiA9PntcbiAgICByZXR1cm4gbmV3IFByb21pc2U8QXJyYXk8QXNzZXQ+PigocmVzb2x2ZSxyZWplY3QpID0+IHsgICAgXG4gICAgICAgIGNvbnN0IGFjY291bnRIdHRwID0gbmV3IEFjY291bnRIdHRwKCk7XG4gICAgICAgIGFjY291bnRIdHRwLmdldEFzc2V0c093bmVkQnlBZGRyZXNzKGFjY291bnQuYWRkcmVzcykuc3Vic2NyaWJlKG1vc2FpY3MgPT57XG4gICAgICAgICAgICByZXNvbHZlKG1vc2FpY3MpOyBcbiAgICAgICAgfSwgZXJyID0+IHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBtb3NhaWNCYWxhbmNlID0gKGJhbGFuY2VzOiBBcnJheTxBc3NldD4pOiBudW1iZXIgPT4ge1xuICAgIGNvbnN0IGZvdW5kID0gYmFsYW5jZXMuZmluZChtb3NhaWMgPT4ge1xuICAgICAgICByZXR1cm4gbW9zYWljLmFzc2V0SWQubmFtZSA9PT0gTU9TQUlDX05BTUU7XG4gICAgfSk7XG4gICAgaWYoIWZvdW5kKSByZXR1cm4gMDtcbiAgICByZXR1cm4gZm91bmQucXVhbnRpdHk7XG59O1xuXG5leHBvcnQgY29uc3QgeGVtQmFsYW5jZSA9IChiYWxhbmNlczogQXJyYXk8QXNzZXQ+KTogbnVtYmVyID0+IHtcbiAgICBjb25zdCB4ZW1Nb3NhaWMgPSBiYWxhbmNlcy5maW5kKG1vc2FpYyA9PiB7XG4gICAgICAgIHJldHVybiBtb3NhaWMuYXNzZXRJZC5uYW1lID09PSAneGVtJztcbiAgICB9KTtcbiAgICBpZigheGVtTW9zYWljKSByZXR1cm4gMDtcbiAgICByZXR1cm4geGVtTW9zYWljLnF1YW50aXR5O1xufSJdfQ==