import { Request, Response } from "express"

const todos = [
    { id: 1, text: 'buy milk', completedAt: new Date() },
    { id: 2, text: 'buy bread', completedAt: null },
    { id: 3, text: 'buy butter', completedAt: new Date() },
];



export class TodosController {

    //* DI
    constructor() { }


    public getTodos = (req: Request, res: Response) => {
        res.json(todos);
    }

    public getTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) res.status(400).json({ error: 'Id must be a number' });

        const todo = todos.find(todo => todo.id === id);

        (todo)
            ? res.json(todo)
            : res.status(404).json({ error: `Todo with id ${id} not found` });

    }

    public createTodo = (req: Request, res: Response) => {

        const { text } = req.body;

        if (!text) res.status(400).json({ error: 'Text is required' });

        if (typeof (text) !== 'string') res.status(400).json({ error: 'Text must be a string' });

        const newTodo = { id: todos.length + 1, text, completedAt: new Date() };

        todos.push(newTodo);
        res.json(newTodo);
    }

    public updateTodo = (req: Request, res: Response) => {

        const { id } = req.params;
        if (!id) res.status(400).json({ error: 'Id is required' });


        const todo = todos.find(todo => todo.id === +id);
        if (!todo) {
            res.status(404).json({ error: `Todo with id ${id} not found` });
            return;
        }

        const { text, completedAt } = req.body;
        

        todo.text = text || todo.text;
        (completedAt === 'null')
            ? todo.completedAt = null
            : todo.completedAt = new Date(completedAt || todo.completedAt);
        res.json(todo);
    }

    public deleteTodo = (req: Request, res: Response) => {
        const {id} = req.params;

        const index = todos.findIndex(todo => todo.id === +id);
        if(index === -1) {
            res.status(404).json({error: `Todo with id ${id} not found`});
            return;           
        }

        todos.splice(index, 1);
        res.json('Todo deleted');
    }
}