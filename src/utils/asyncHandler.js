const asyncHandler = (requestHandler) => {
    return (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).
        catch((err)=>next(err));
    }
}

export {asyncHandler}
// const asyncHandler = () => {}
// const asyncHandler = (fun1) => () => {} 
// this is the synatx in which we are passing a function or argument in the async function
// const asyncHandler = (func1) => async() => {}

// const asyncHandler = (fn) => async(req,res,next) => {
//     try{
//         await fn(req,res,next);
//     }catch(error){
//         res.status(error.code || 500).json({
//             success: false,
//             message: "An error occured"
//         });
//     }
// }