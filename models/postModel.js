var ObjectId = require("mongodb").ObjectID;

const listPost = async (post) => {
  return await post.find().toArray();
};

const createPost = async (post, data) => {
  post
    .insertOne(data)
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
};

const updatePost = async (post, data) => {
  post
    .updateOne(
      { _id: ObjectId(data.id) },
      {
        $set: {
          name: data.name,
          description: data.description,
          status: data.status,
        },
      }
    )
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const deletePost = async (post, id) => {
  post.deleteOne({ _id: ObjectId(id) });
};

// const categoryModel = {
//   post: mongoDb.getDb().collection("post"),
//   create: async (data) => {
//     post
//       .insertOne(data)
//       .then((data) => {
//         console.log(data);
//       })
//       .catch((err) => console.log(err));
//   },

//   update: async (data) => {
//     post
//       .updateOne(
//         { _id: ObjectId(data.id) },
//         {
//           $set: {
//             name: data.name,
//             description: data.description,
//             status: data.status,
//           },
//         }
//       )
//       .then((data) => {
//         return data;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   },
//   delete: async () => {},
// };

module.exports = {
  listPost,
  createPost,
  updatePost,
  deletePost,
};
