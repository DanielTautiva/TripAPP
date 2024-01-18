    interface RandomCard {
        email: string;
        number: string;
        exp_month: string;
        exp_year: string;
        cvc: string;
        card_holder: string;
    }
  
    export function generateRandomCard(): RandomCard {
        const getRandomNumber = (length: number) => {
        return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)).toString();
        };
    
        const getRandomString = (length: number) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
        };
    
        const randomExpMonth = (Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0');
        const randomExpYear = (new Date().getFullYear() + Math.floor(Math.random() * 5)).toString().slice(-2);
    
        return {
            email: `${getRandomString(8)}@example.com`,
            number: "4242424242424242",
            exp_month: randomExpMonth,
            exp_year: randomExpYear,
            cvc: getRandomNumber(3),
            card_holder: "Sr Daniel Tautiva",
        };
    }
  
