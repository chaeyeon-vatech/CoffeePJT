import { extendResolversFromInterfaces } from 'apollo-server';
import Order from '../../models/order.js';
import Task from '../../models/task.js';
import users from '../../models/user.js';
// resolver에서 mutation을 정의하고 구현하는 걸 보니 가장 중요한 부분이 아닐까 싶다. service 단이라고 생각하자
const resolvers = {
    Query: {
        orders: async(_, args) => {
            try {
                if(args.hi == "icecream"){
                    return await Order.find({"hi":{$eq:"icecream"}})
                }
                else if(args.hi == "etc"){
                    return await Order.find({"hi":{$eq:"etc"}})
                }
                else {
                    return await Order.find({"hi":{$nin:["icecream","etc"]}})
                }
            } catch (err) {
                console.log(err);
                throw err;
            }
        },
        orderMine: async(_, args)=>{
            try {
                const user = await users.findById(args._id)
                
                const word = user.username
                return await Order.find({"username":{$eq:word}})
            } catch (err){
                console.log(err);
                throw err;
            }
        },
        tasks: async(_, args) => {
            try {
                let tasks = await Task.find();
                if(tasks.length == 0) return null;
                return tasks;
            } catch (err) {
                console.log(err);
                throw err;
            }
        },
        user: async(_, args) => {
            const word = args.word;
            const category = args.category;
            if(category == 1){
                if(word == "") return null
                return await users.find({"username":{$regex:word}})  
            }
            else{
                if(word == "") return null
                return await users.find({"username":{$regex:word},"position":{$eq:"주문자"}})
            }
            
        },
        
        // 모든 유저 검색
        allUsers: async(_, args) => {
            try {
                return users.find()
            } catch (error) {
                throw new Error(error.message)
            }
        },
        me: async (_, args) => {
            return await users.findById(args.userid)
        },
        howmany: async(_,args)=>{
            const number = [0,0,0,0];
            const people = await users.find()
            for (let i = 0; i < people.length; i++) {

                if (people[i].status === "주문완료") {
                    number[0]++;
                }
                else if(people[i].status === "주문취소"){
                    number[1]++;
                }
                else if(people[i].status === "주문포기"){
                    number[2]++;
                }
                else{
                    number[3]++;
                }
            }
            return number;

        },
        howmuch: async(_,args)=>{
            let sum=0;
            const orders = await Order.find();
            console.log(orders.length)
            for(let i=0; i<orders.length; i++){
                if(orders[i].menu === "아메리카노"){
                    
                    sum+=2000;
                }
                else if(orders[i].menu === "카페라떼"){
                    
                    sum+=2500;
                }
                else if(orders[i].menu === "바닐라라떼"){
                    
                    sum+=3000;
                }
                else if(orders[i].menu === "카페모카"){
                    
                    sum+=3000;
                }
                else if(orders[i].menu === "아시나요"){
                    
                    sum+=3000;
                }
                else if(orders[i].menu === "돼지콘"){
                    
                    sum+=3000;
                }
                else if(orders[i].menu === "브라보"){
                    
                    sum+=3000;
                }
                else if(orders[i].menu === "녹차마루"){
                    
                    sum+=3000;
                }
                else if(orders[i].menu === "아이스티"){
                    
                    sum+=2000;
                }
                else if(orders[i].menu === "망고 요거트 스무디"){
                    
                    sum+=3400;
                }
                else if(orders[i].menu === "딸기 요거트 스무디"){
                    
                    sum+=3400;
                }
                else if(orders[i].menu === "플레인 요거트 스무디"){
                    
                    sum+=3400;
                }
            }
            return sum;
        },
        includedCoffee: async(_,args)=>{
            const menu = args.menu;
            const hi = args.hi;
            const result = Order.find({"menu":{$eq:menu}, "hi":{$eq:hi}})
            
            return result
        },
        includedOrdermen: async(_, args)=>{
            const result = users.find({"position":{$eq:"주문자"}})
            return  result
        },
        includedVacation: async(_,args)=>{
            
            const result = users.find({"position":{$eq:"휴가자"}})
            
            return result
        },
        includedNothing: async(_,args)=>{
            const status = "대기중"
            const position = "휴가자"
            const result = users.find({"status":{$eq:status},"position":{$ne:position}})
            return result
        },
        receipt: async(_,args)=>{
            const orders = await Order.find()
            const orderV = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            let mention = ["","","","","","","","","","","","","","","",""]
            for(let i=0; i<orders.length; i++){
                if(orders[i].menu === "아메리카노" && orders[i].hi === "hot"){
                    orderV[0]++;
                }
                else if(orders[i].menu === "아메리카노" && orders[i].hi === "ice"){
                    orderV[1]++;
                }
                else if(orders[i].menu === "카페라떼" && orders[i].hi === "hot"){
                    orderV[2]++;
                }
                else if(orders[i].menu === "카페라떼" && orders[i].hi === "ice"){
                    orderV[3]++;
                }
                else if(orders[i].menu === "바닐라라떼"&& orders[i].hi === "hot"){
                    orderV[4]++;
                }
                else if(orders[i].menu === "바닐라라떼" && orders[i].hi === "ice"){
                    orderV[5]++;
                }
                else if(orders[i].menu === "카페모카" && orders[i].hi === "hot"){
                    orderV[6]++;
                }
                else if(orders[i].menu === "카페모카" && orders[i].hi === "ice"){
                    orderV[7]++;
                }
                else if(orders[i].menu === "아시나요" && orders[i].hi === "icecream"){
                    orderV[8]++;
                }
                else if(orders[i].menu === "돼지콘" && orders[i].hi === "icecream"){
                    orderV[9]++;
                }
                else if(orders[i].menu === "브라보" && orders[i].hi === "icecream"){
                    orderV[10]++;
                }
                else if(orders[i].menu === "녹차마루" && orders[i].hi === "icecream"){
                    orderV[11]++;
                }
                else if(orders[i].menu === "아이스티"&& orders[i].hi === "etc"){
                    orderV[12]++;
                }
                else if(orders[i].menu === "망고 요거트 스무디" && orders[i].hi === "etc"){
                    orderV[13]++;
                }
                else if(orders[i].menu === "딸기 요거트 스무디" && orders[i].hi === "etc"){
                    orderV[14]++;
                }
                else if(orders[i].menu === "플레인 요거트 스무디" && orders[i].hi === "etc"){
                    orderV[15]++;
                }
            }
            console.log(orderV)
            for (let i = 0; i < orderV.length; i++) {
                if(orderV[i] != 0 && i == 0){
                    mention[i] = "Hot 아메리카노 : " + orderV[i] + "잔"
                }
                else if(orderV[i] != 0 && i == 1){
                    mention[i] = "Ice 아메리카노 : " + orderV[i] + "잔"
                }
                else if(orderV[i] != 0 && i == 2){
                    mention[i] = "Hot 카페라떼 : " + orderV[i] + "잔"
                }
                else if(orderV[i] != 0 && i == 3){
                    mention[i] = "Ice 카페라떼 : " + orderV[i] + "잔"
                }
                else if(orderV[i] != 0 && i == 4){
                    mention[i] = "Hot 바닐라라떼 : " + orderV[i] + "잔"
                }
                else if(orderV[i] != 0 && i == 5){
                    mention[i] = "Ice 바닐라라떼 : " + orderV[i] + "잔"
                }
                else if(orderV[i] != 0 && i == 6){
                    mention[i] = "Hot 카페모카 : " + orderV[i] + "잔"
                }
                else if(orderV[i] != 0 && i == 7){
                    mention[i] = "Ice 카페모카 : " + orderV[i] + "잔"
                }
                else if(orderV[i] != 0 && i == 8){
                    mention[i] = "아시나요 : " + orderV[i] + "개"
                }
                else if(orderV[i] != 0 && i == 9){
                    mention[i] = "돼지콘 : " + orderV[i] + "개"
                }
                else if(orderV[i] != 0 && i == 10){
                    mention[i] = "브라보 : " + orderV[i] + "개"
                }
                else if(orderV[i] != 0 && i == 11){
                    mention[i] = "녹차마루 : " + orderV[i] + "개"
                }
                else if(orderV[i] != 0 && i == 12){
                    mention[i] = "아이스티 : " + orderV[i] + "잔"
                }
                else if(orderV[i] != 0 && i == 13){
                    mention[i] = "망고 요거트 스무디 : " + orderV[i] + "잔"
                }
                else if(orderV[i] != 0 && i == 14){
                    mention[i] = "딸기 요거트 스무디 : " + orderV[i] + "잔"
                }
                else if(orderV[i] != 0 && i == 15){
                    mention[i] = "플레인 요거트 스무디 : " + orderV[i] + "잔"
                }
            }
            console.log(mention)
            return mention
        }

    },
    Mutation: {
        createOrder: async (_, args) => {
            try {
                const us = await users.findById(args._id)
                const confirm = us.status
                if(confirm === "주문완료") throw new Error("이미 주문 하셨습니다.");
                
                const username = us.username
                const menu = args.menu;
                const hi = args.hi
                const order = new Order({username, menu, hi});
                                
                await users.findByIdAndUpdate(args._id,{status:"주문완료"});
                const result = await order.save();
                
                return result;
            } catch (e) {
                throw new Error('Error: ', e);
            }
        },
        removeOrder: async (_, args) => {
            try {
                await users.findByIdAndUpdate(args.userid,{status:"주문취소"});
                const removedorder = await Order.findByIdAndRemove(args.orderid).exec()
                return removedorder
            } catch (e) {
                throw new Error('Error: ', e)
            }
        },
        updateOrder: async (_, {userid, orderid, menu, hi},{user}) => {
            try {
                await users.findByIdAndUpdate(userid,{status:"주문완료"});
                const updatedOrder = await Order.findByIdAndUpdate(orderid, {
                    $set: {menu, hi}
                }).exec()
                return updatedOrder
            } catch (e) {
                throw new Error('Error: ', e)
            }
        },
        giveupOrder: async (_, args)=>{
            await users.findByIdAndUpdate(args.userid,{status:"주문포기"});
            return "주문을 포기하셨습니다."
        },
        
        
        confirmOrders: async(_,args)=>{
            
            await Order.deleteMany({});
            await Task.deleteMany({});
            const renualUser = await users.find();
            
            for (let index = 0; index < renualUser.length; index++) {
                await users.findByIdAndUpdate(renualUser[index].id,{status:"대기중", position:"주문자"})  
            }

            return "완료 처리 되었습니다. 맛있게 드세요!"
        },
        createTask: async (_, {userid, title}) => {
            try {
                const isthere = await Task.find()
                if(isthere.length != 0){
                    throw new Error
                }
                const us = await users.findById(userid);
                const creater = us.username;
                const task = new Task({creater,
                    title
                })
                const result = await task.save();
                await users.findByIdAndUpdate(userid,{position:"결제자"})

                return result;
            } catch (e) {
                throw new Error('Error: 이미 다른 주문이 진행중입니다. 주문이 완료되면 그때 다시 시도해주세요', e);
            }
        },
        removeTask: async (_, {_id, userid}) => {
            try {
                const removedTask = await Task.findByIdAndRemove(_id).exec()
                await users.findByIdAndUpdate(userid,{position:"주문자"})
                return removedTask
            } catch (e) {
                throw new Error('Error: ', e)
            }
        },
        updateTask: async (_, {_id, title},{user}) => {
            try {
                
                const updatedTask = await Task.findByIdAndUpdate(_id, {
                    $set: {title}
                }).exec()
                return updatedTask
            } catch (e) {
                throw new Error('Error: ', e)
            }
        },
        // 회원가입
        registerUser: async (_, args) => {
            try {
                const username = args.username;
                const user = new users({
                    username
                })
                const re = await users.find({"username":{$eq:username}})
                if(re.length != 0) throw new Error("이미 있는 유저입니다.");

                return await user.save();
            } catch (error) {
                throw new Error(error.message)
            }
        },
        updatePosition: async (_, args) => {
            try{    
                const ids = args.ids;
                for (let i = 0; i < ids.length; i++) {
                    
                    await users.findByIdAndUpdate(ids[i],{$set:{"position":"휴가자"}})
                    
                }
                
                return "휴가자 등록이 완료 되었습니다."

            } catch(error){
                throw new Error(error.message)
            }
        },
        updateUser: async (_, {_id,username}) => {
            try{
                
                return await users.findByIdAndUpdate(_id,{$set:{username}}).exec()
            } catch(error){
                throw new Error(error.message)
            }
        },
        getbackUser: async (_, args) => {
            try{    
                const ids = args.ids;
                for (let i = 0; i < ids.length; i++) {
                    
                    await users.findByIdAndUpdate(ids[i],{$set:{"position":"주문자"}})
                    
                }
                return "해당 인원은 주문자로 다시 바뀌었습니다."

            } catch(error){
                throw new Error(error.message)
            }
        },
        getbackStatus:async(_,args)=>{
            try{    
                const id = args._id;
                     
                await users.findByIdAndUpdate(id,{$set:{"status":"대기중"}})
                    
  
                return "해당 인원은 주문포기에서 대기중으로 다시 바뀌었습니다."

            } catch(error){
                throw new Error(error.message)
            }
        },
        deleteUser:async(_,args)=>{
            const removedUser = await users.findByIdAndRemove(args._id).exec()
            return removedUser
        },
        mee: async (_, args) => {
            return await users.findById(args.userid)
        },
    }
};

export default resolvers;