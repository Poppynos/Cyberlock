        const canvas = canva.createCanvas(330, 397)
        const context = canvas.getContext('2d')

        const background = await canva.loadImage('Src/commands/games/images/BlackSquare.png')
        context.drawImage(background , 0 , 0 , canvas.width , canvas.height)

        context.font = '42px Clear Sans, Helvetica Neue, Arial, sans-serif';
        context.textAlign = 'center'
        context.fillStyle = '#d7dadc'

        const absentSquare = await canva.loadImage('Src/commands/games/images/ColorAbsent.png');
        const emptySquare = await canva.loadImage('Src/commands/games/images/EmptySquare.png');
        const greenSquare = await canva.loadImage('Src/commands/games/images/GreenSquare.png');
        const yellowSquare = await canva.loadImage('Src/commands/games/images/YellowSquare.png');

        let squareSize = 62;
        let rowOffset = 0;
        let buffer = 0;

        for (let j = 0; j < 6; j++)
        {
            for (let i = 0; i < 5; i++)
            {

                if(j > 2){square = emptySquare;}
                else if(j==2){square = greenSquare;}
                else if(j==1){square = yellowSquare;}
                else if(j==0){square = absentSquare;}

                context.drawImage(square, i*squareSize+buffer, rowOffset, squareSize, squareSize);
                context.fillText('a', (squareSize/2)+buffer+squareSize*i, rowOffset+42);
                buffer+=5;
            }
            buffer=0;
        }

        const attachment = new AttachmentBuilder(canvas.toBuffer(), 'wordle.png');

        interaction.reply({files : [attachment]});  