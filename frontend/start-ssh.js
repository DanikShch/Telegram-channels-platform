import { spawn } from 'child_process';

const sshCommand = 'ssh';
const sshArgs = ['-R', '80:localhost:5173', 'nokey@localhost.run'];

console.log('Запуск команды SSH...');

const sshProcess = spawn(sshCommand, sshArgs);

sshProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

sshProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

sshProcess.on('error', (error) => {
    console.error(`Ошибка: ${error.message}`);
});

sshProcess.on('close', (code) => {
    console.log(`Процесс завершён с кодом: ${code}`);
});