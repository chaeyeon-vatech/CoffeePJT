import Order from '../../models/order.js';
import Task from '../../models/task.js';
import users from '../../models/user.js';
// resolver에서 mutation을 정의하고 구현하는 걸 보니 가장 중요한 부분이 아닐까 싶다. service 단이라고 생각하자
const resolvers = {
    Query: {
        async orders(_, args) {
            try {
                let orders = await Order.find();
                    
                return orders;
            } catch (err) {
                console.log(err);
                throw err;
            }
        },
        
        async tasks(_, args) {
            try {
                let tasks = await Task.find();
                
                return tasks;
            } catch (err) {
                console.log(err);
                throw err;
            }
        },
        async user(_, args) {
            const word = args.word;
            
            return await users.find({username:{$regex:word}})
        },
        async me(_, args) {
            return await users.findById(args.userid)
        },
        // 모든 유저 검색
        async allUsers(_, args) {
            try {
                return users.find()
            } catch (error) {
                throw new Error(error.message)
            }
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
                else if(orders[i].menu === "카페모카"){
                    
                    sum+=2500;
                }
                else if(orders[i].menu === "아이스티"){
                    
                    sum+=2500;
                }
                else if(orders[i].menu === "바닐라라떼"){
                    
                    sum+=3000;
                }
            }
            return sum;
        },
        coffeeAmount: async(_,args)=>{
            let coffee = [0,0,0,0,0,0,0,0];
            const orders = await Order.find();
            for(let i=0; i<orders.length; i++){
                if(orders[i].menu === "아메리카노" && orders[i].hi === "hot"){
                    coffee[0]++;
                }
                else if(orders[i].menu === "아메리카노" && orders[i].hi === "ice"){
                    coffee[1]++;
                }
                else if(orders[i].menu === "카페모카" && orders[i].hi === "hot"){
                    coffee[2]++;
                }
                else if(orders[i].menu === "카페모카" && orders[i].hi === "ice"){
                    coffee[3]++;
                }
                else if(orders[i].menu === "아이스티"&& orders[i].hi === "hot"){
                    coffee[4]++;
                }
                else if(orders[i].menu === "아이스티" && orders[i].hi === "ice"){
                    coffee[5]++;
                }
                else if(orders[i].menu === "바닐라라떼" && orders[i].hi === "hot"){
                    coffee[6]++;
                }
                else if(orders[i].menu === "바닐라라떼" && orders[i].hi === "ice"){
                    coffee[7]++;
                }
            }
            return coffee;
        },
        includedCoffee: async(_,args)=>{
            const menu = args.menu;
            const hi = args.hi;
            const result = Order.find({"menu":{$eq:menu}, "hi":{$eq:hi}})
            
            return result
        },
        includedVacation: async(_,args)=>{
            
            const result = users.find({"position":{$eq:"휴가자"}})
            
            return result
        },
        includedNothing: async(_,args)=>{
            const result = users.find({"status":{$eq:""},"position":{$ne:"휴가자"}})
            return result
        }

    },
    Mutation: {
        createOrder: async (_, args) => {
            try {
                const us = await users.findById(args._id)
                const confirm = us.status
                console.log(args)
                console.log(us)
                console.log(confirm)
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
                await users.findByIdAndUpdate(renualUser[index].id,{status:"", position:"주문자"})  
            }

            return "완료 처리 되었습니다. 맛있게 드세요!"
        },
        createTask: async (_, {userid, title}) => {
            try {
                const us = await users.findById(userid);
                const creater = us.username;
                const task = new Task({creater,
                    title
                })
                const result = await task.save();
                
                return result;
            } catch (e) {
                throw new Error('Error: ', e);
            }
        },
        removeTask: async (_, {_id}) => {
            try {
                const removedTask = await Task.findByIdAndRemove(_id).exec()
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
                
                return await user.save();
            } catch (error) {
                throw new Error(error.message)
            }
        },
        updateUser: async (_, args) => {
            try{    
                const id = args._id;
                const position = args.position;
                const user = new users({position})

                const updatedPosition = await users.findByIdAndUpdate(id,{$set:{position}}).exec()
                return updatedPosition

            } catch(error){
                throw new Error(error.message)
            }
        }
        
    }
};

export default resolvers;