import Content from '../../models/content.js';
import users from '../../models/user.js';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
// resolver에서 mutation을 정의하고 구현하는 걸 보니 가장 중요한 부분이 아닐까 싶다. service 단이라고 생각하자
const resolvers = {
    Query: {
        async contents(_, args) {
            try {
                const contents = await Content.find().sort({createdAt: -1});
                const search = args.search || "";
                const index = args.index;
                const hasNext = args.hasNext;
                let result = []
                if (args.category == 1) {

                    for (let i = 0; i < contents.length; i++) {

                        if (contents[i].title.toLowerCase().indexOf(search.toLowerCase()) > -1) {
                            result.push(contents[i]);
                        }
                    }
                    if (hasNext == false) {
                        result = result.slice(10 * (index - 1), result.length);
                    } else {
                        result = result.slice(10 * (index - 1), 10 * (index));
                    }
                } else if (args.category == 2) {
                    for (let i = 0; i < contents.length; i++) {

                        if (contents[i].content.toLowerCase().indexOf(search.toLowerCase()) > -1) {
                            result.push(contents[i]);
                        }
                    }
                    if (hasNext == false) {
                        result = result.slice(10 * (index - 1), result.length);
                    } else {
                        result = result.slice(10 * (index - 1), 10 * (index));
                    }
                } else {
                    for (let i = 0; i < contents.length; i++) {

                        if (contents[i].content.toLowerCase().indexOf(search.toLowerCase()) > -1 || contents[i].title.toLowerCase().indexOf(search.toLowerCase()) > -1) {
                            result.push(contents[i]);
                        }
                    }
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
        },
        async maxIndex(){
          const contents = await Content.find().sort({createdAt: -1});
          return contents.length;
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
    Content: {
        _id(_, args) {
            return _._id;
        },
        title(_, args) {
            return _.title;
        },
        content(_, args) {
            return _.content;
        },
        createdAt(_, args) {
            return _.createdAt;
        }
    },
    Mutation: {
        createContent: async (_, args) => {
            try {
                const content = new Content({
                    ...args.contentInput
                })
                const result = await content.save();
                return result;
            } catch (e) {
                throw new Error('Error: ', e);
            }
        },
        removeContent: async (_, args) => {
            try {
                const removedcontent = await Content.findByIdAndRemove(args._id).exec()
                return removedcontent
            } catch (e) {
                throw new Error('Error: ', e)
            }
        },
        updateContent: async (_, {_id, title, content}) => {
            try {
                const updatedContent = await Content.findByIdAndUpdate(_id, {
                    $set: {title, content}
                }).exec()
                return updatedContent
            } catch (e) {
                throw new Error('Error: ', e)
            }
        },
        searchByID: async (_, args) => {
            try {
                const searchcontent = await Content.findById(args._id).exec()
                return searchcontent
            } catch (e) {
                throw new Error('Error: ', e)
            }
        },
        // 회원가입
        registerUser: async (root, {username, email, password}) => {
            try {
                // 이메일 중복 체크
                const userConfirm = await users.findOne({email: email})
                if (userConfirm != null) {
                    return "Already registered Email. Please try again.";
                }
                const user = await users.create({
                    username,
                    email,
                    password: await bcrypt.hash(password, 10)
                })
                const token = jsonwebtoken.sign(
                    {id: user.id, email: user.email},
                    "somereallylongsecret",
                    {expiresIn: '1y'}
                )
                return {
                    token, id: user.id, username: user.username, email: user.email, message: "Authentication succesfull"
                }
            } catch (error) {
                throw new Error(error.message)
            }
        },
        login: async (_, {email, password}) => {
            try {
                // 유저 이메일 정보 확인 후 로그인
                const user = await users.findOne({email: email})
                console.log(user);
                console.log(email);
                if (!user) {
                    throw new Error('No user with that email')
                }
                const isValid = await bcrypt.compare(password, user.password)
                if (!isValid) {
                    throw new Error('Incorrect password')
                }
                // return jwt
                const token = jsonwebtoken.sign(
                    {id: user.id, email: user.email},
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