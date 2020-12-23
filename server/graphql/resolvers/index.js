import Order from '../../models/order.js';
import Task from '../../models/task.js';
import users from '../../models/user.js';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import { ObjectID } from 'bson';
// resolver에서 mutation을 정의하고 구현하는 걸 보니 가장 중요한 부분이 아닐까 싶다. service 단이라고 생각하자
const resolvers = {
    Query: {
        async orders(_, args,{user}) {
            try {
                if (!user) throw new Error('You are not authenticated')
                let orders = await Order.find().sort({createdAt: -1});
                const search = args.search || "";
                const category = args.category;
                const index = args.index;
                const hasNext = args.hasNext;
                const acdc = args.acdc;
                if(acdc === "menu"){
                    orders = await Order.find().sort({menu:1});
                }
                else if(acdc === "hi"){
                    orders = await Order.find().sort({hi:1});
                }
                else if(acdc === 'username'){
                    orders = await Order.find().sort({username:1});
                }
                else if(acdc === "createdAt"){
                    orders = await Order.find().sort({createdAt:1});
                }
                let result = []
                if (category == 1) {

                    for (let i = 0; i < orders.length; i++) {

                        if (orders[i].menu.indexOf(search) > -1) {
                            result.push(orders[i]);
                        }
                    }
                    if (hasNext == false) {
                        result = result.slice(10 * (index - 1), result.length);
                    } else {
                        result = result.slice(10 * (index - 1), 10 * (index));
                    }
                } else if (category == 2) {
                    for (let i = 0; i < orders.length; i++) {

                        if (orders[i].hi.indexOf(search) > -1) {
                            result.push(orders[i]);
                        }
                    }
                    if (hasNext == false) {
                        result = result.slice(10 * (index - 1), result.length);
                    } else {
                        result = result.slice(10 * (index - 1), 10 * (index));
                    }
                } else if(category == 3){
                    for (let i = 0; i < orders.length; i++) {

                        if (orders[i].username.indexOf(search) > -1) {
                            result.push(orders[i]);
                        }
                    }
                    if (hasNext == false) {
                        result = result.slice(10 * (index - 1), result.length);
                    } else {
                        result = result.slice(10 * (index - 1), 10 * (index));
                    }
                } else{
                    result = orders;
                }
                return result;
            } catch (err) {
                console.log(err);
                throw err;
            }
        },
        // 로그인 되어 있는 나
        async me(_, args, {user}) {
            if (!user) throw new Error('You are not authenticated')
            return await users.findById(user.id)
        },
        async tasks(_, args,{user}) {
            try {
                if (!user) throw new Error('You are not authenticated')
                let tasks = await Task.find().sort({createdAt: -1});
                const search = args.search || "";
                const category = args.category;
                const index = args.index;
                const hasNext = args.hasNext;
                const acdc = args.acdc;
                if(acdc === "creater"){
                    tasks = await Task.find().sort({creater:1});
                }
                else if(acdc === "title"){
                    tasks = await Task.find().sort({title:1});
                }
                else if(acdc === "createdAt"){
                    tasks = await Task.find().sort({createdAt:1});
                }
                let result = []
                if (category == 1) {

                    for (let i = 0; i < tasks.length; i++) {

                        if (tasks[i].creater.indexOf(search) > -1) {
                            result.push(tasks[i]);
                        }
                    }
                    if (hasNext == false) {
                        result = result.slice(10 * (index - 1), result.length);
                    } else {
                        result = result.slice(10 * (index - 1), 10 * (index));
                    }
                } else if (category == 2) {
                    for (let i = 0; i < tasks.length; i++) {

                        if (tasks[i].title.indexOf(search) > -1) {
                            result.push(tasks[i]);
                        }
                    }
                    if (hasNext == false) {
                        result = result.slice(10 * (index - 1), result.length);
                    } else {
                        result = result.slice(10 * (index - 1), 10 * (index));
                    }
                } 
                else{
                    result = tasks;
                    if (hasNext == false) {
                        result = result.slice(10 * (index - 1), result.length);
                    } else {
                        result = result.slice(10 * (index - 1), 10 * (index));
                    }
                }
                return result;
            } catch (err) {
                console.log(err);
                throw err;
            }
        },        // id로 검색
        async user(root, {id}, {user}) {
            try {
                if (!user) throw new Error('You are not authenticated!')
                return users.findById(id)
            } catch (error) {
                throw new Error(error.message)
            }
        },
        // 모든 유저 검색
        async allUsers(root, args, {user}) {
            try {
                if (!user) throw new Error('You are not authenticated!')
                return users.find()
            } catch (error) {
                throw new Error(error.message)
            }
        }
    },
    Order: {
        _id(_, args) {
            return _._id;
        },
        menu(_, args) {
            return _.menu;
        },
        hi(_, args) {
            return _.hi;
        },
        createdAt(_, args) {
            return _.createdAt;
        },
        username(_, args){
            return _.username;
        }
    },
    Mutation: {
        createOrder: async (_, args, {user}) => {
            try {
                if(!user) throw error("로그인 되어 있지 않습니다.");
                const order = new Order({
                    ...args.orderInput
                })
                
                await users.findOneAndUpdate(user._id,{status:"주문완료"});
                const result = await order.save();
                return result;
            } catch (e) {
                throw new Error('Error: ', e);
            }
        },
        removeOrder: async (_, args,{user}) => {
            try {
                if(!user) throw error("로그인 되어 있지 않습니다.");
                await users.findOneAndUpdate(user._id,{status:"주문취소"});
                const removedorder = await Order.findByIdAndRemove(args._id).exec()
                return removedorder
            } catch (e) {
                throw new Error('Error: ', e)
            }
        },
        updateOrder: async (_, {_id, menu, hi},{user}) => {
            try {
                if(!user) throw error("로그인 되어 있지 않습니다.");
                await users.findOneAndUpdate(user._id,{status:"주문완료"});
                const updatedOrder = await Order.findByIdAndUpdate(_id, {
                    $set: {menu, hi}
                }).exec()
                return updatedOrder
            } catch (e) {
                throw new Error('Error: ', e)
            }
        },
        giveupOrder: async (_, args,{user})=>{
            if(!user) throw error("로그인 되어 있지 않습니다.");
            await users.findOneAndUpdate(user._id,{status:"주문포기"});
            return "주문을 포기하셨습니다."
        },
        howmany: async(_,args)=>{
            const number = [0,0,0];
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
        // confirmOrders: async(_,{_id,creater},{user})=>{
        //     if(!user) throw error("로그인 되어 있지 않습니다.");
        //     if(user._id != creater) throw error("결제자가 아닙니다.");
        //     // 근데 다 지우는 건 뭘 기준으로??
        //     return "완료 처리 되었습니다. 맛있게 드세요!"
        // },
        createTask: async (_, args, {user}) => {
            try {
                if(!user) throw error("로그인 되어 있지 않습니다.");
                
                const task = new Task({
                    ...args.taskInput
                })
                const result = await task.save();
                console.log(result._id)
                
                return result;
            } catch (e) {
                throw new Error('Error: ', e);
            }
        },
        removeTask: async (_, {_id},{user}) => {
            try {
                if(!user) throw error("로그인 되어 있지 않습니다.");
                // if(user._id != creater) throw error("게시물 작성자가 아니어서 삭제할 수 없습니다.");
                const removedTask = await Task.findByIdAndRemove(_id).exec()
                return removedTask
            } catch (e) {
                throw new Error('Error: ', e)
            }
        },
        updateTask: async (_, {_id, title},{user}) => {
            try {
                if(!user) throw error("로그인 되어 있지 않습니다.");
                // if(user._id != creater) throw error("게시물 작성자가 아니어서 수정할 수 없습니다.");
                
                const updatedTask = await Task.findByIdAndUpdate(_id, {
                    $set: {title}
                }).exec()
                return updatedTask
            } catch (e) {
                throw new Error('Error: ', e)
            }
        },
        searchByID: async (_, args) => {
            try {
                const searchOrder = await Order.findById(args._id).exec()
                return searchOrder
            } catch (e) {
                throw new Error('Error: ', e)
            }
        },
        // 회원가입
        registerUser: async (root, {username, idNum, password}) => {
            try {
                // 이메일 중복 체크
                const userConfirm = await users.findOne({idNum: idNum})
                if (userConfirm != null) {
                    return "Already registered idNum.";
                }
                const user = await users.create({
                    username,
                    idNum,
                    password: await bcrypt.hash(password, 10)
                })
                const token = jsonwebtoken.sign(
                    {id: user.id, idNum: user.idNum},
                    "somereallylongsecret",
                    {expiresIn: '1y'}
                )
                return {
                    token, id: user.id, username: user.username, idNum: user.idNum, message: "Authentication succesfull"
                }
            } catch (error) {
                throw new Error(error.message)
            }
        },
        login: async (_, {idNum, password}) => {
            try {
                // 유저 이메일 정보 확인 후 로그인
                const user = await users.findOne({idNum: idNum})
                console.log(user);
                console.log(idNum);
                if (!user) {
                    throw new Error('No user with that email')
                }
                const isValid = await bcrypt.compare(password, user.password)
                if (!isValid) {
                    throw new Error('Incorrect password')
                }
                // return jwt
                const token = jsonwebtoken.sign(
                    {id: user.id, idNum: user.idNum},
                    "somereallylongsecret",
                    {expiresIn: '1d'}
                )
                return {
                    token, user
                }
            } catch (error) {
                throw new Error(error.message)
            }
        },
        logout: async (_, __, {user}) => {
            if (!user) {
                return false;
            } else { // 로그인 상태라면(토큰이 존재하면) 토큰 비워주기
                user.token = '';
                return true;
            }

        }
    }
};

export default resolvers;