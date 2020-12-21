import Order from '../../models/order.js';
import users from '../../models/user.js';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
// resolver에서 mutation을 정의하고 구현하는 걸 보니 가장 중요한 부분이 아닐까 싶다. service 단이라고 생각하자
const resolvers = {
    Query: {
        async orders(_, args) {
            try {
                const orders = await Order.find().sort({createdAt: -1});
                const search = args.search || "";
                const category = args.category;
                const index = args.index;
                const hasNext = args.hasNext;
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
        // id로 검색
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
        createOrder: async (_, args) => {
            try {
                const order = new Order({
                    ...args.orderInput
                })
                const result = await order.save();
                return result;
            } catch (e) {
                throw new Error('Error: ', e);
            }
        },
        removeOrder: async (_, args) => {
            try {
                const removedorder = await Order.findByIdAndRemove(args._id).exec()
                return removedorder
            } catch (e) {
                throw new Error('Error: ', e)
            }
        },
        updateOrder: async (_, {_id, menu, hi}) => {
            try {
                const updatedOrder = await Order.findByIdAndUpdate(_id, {
                    $set: {menu, hi}
                }).exec()
                return updatedOrder
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