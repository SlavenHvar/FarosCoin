function checkWeb3()
 {
    let bool =false;
    if (typeof web3 !== 'undefined') {
      console.log(typeof web3);
      console.log('Web3 found');
      window.web3 = new Web3(window.ethereum);
      web3.eth.defaultAccount = web3.eth.accounts[0];
      $("#notifyErr3").show();
      $("#errTxt3").text("Web3 found");
      $("#errTxt3").css('color', 'green');
      bool = true;
    } 
    else {
      console.error('web3 was undefined');
      $("#notifyErr3").show();
      $("#errTxt3").text("Web3 was undefined, please install Web3 wallet!");
      $("#errTxt3").css('color', 'red');
      bool = false;
    }  
    return bool;
 }

async function BuyFAROS(amount) {
  try {
        var accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        var networktype = await web3.eth.net.getNetworkType();
        console.log("Network type")
        console.log(networktype)
        const account = accounts[0];

        // Set Contract Abi//add "payable":true//
        var contractAbi =[
          {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              }
            ],
            "name": "Approval",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              }
            ],
            "name": "Transfer",
            "type": "event"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "owner",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "spender",
                "type": "address"
              }
            ],
            "name": "allowance",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "spender",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              }
            ],
            "name": "approve",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "account",
                "type": "address"
              }
            ],
            "name": "balanceOf",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              }
            ],
            "name": "buyFarosCoin",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "payable":true,
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "contractCreator",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "decimals",
            "outputs": [
              {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "spender",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "subtractedValue",
                "type": "uint256"
              }
            ],
            "name": "decreaseAllowance",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "spender",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "addedValue",
                "type": "uint256"
              }
            ],
            "name": "increaseAllowance",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "name",
            "outputs": [
              {
                "internalType": "string",
                "name": "",
                "type": "string"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "price",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "newPrice",
                "type": "uint256"
              }
            ],
            "name": "setMintingPrice",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "symbol",
            "outputs": [
              {
                "internalType": "string",
                "name": "",
                "type": "string"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "to",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              }
            ],
            "name": "transfer",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "from",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "to",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              }
            ],
            "name": "transferFrom",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
              }
            ],
            "name": "withDrawMatic",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          }
        ];//changed
        
        
        // Set Contract Address
        var contractAddress = '0xEaC4c075f20886BB8bBc2998fB59FEB6a62b04fE';//changed

        // Set the Contract
        var contract = new web3.eth.Contract(contractAbi, contractAddress);
      
        $("#notifyErr2").show();

        if( networktype === "private")
        {
          $("#errTxt2").text("Before confirming the transaction, please make sure your web3 wallet is connected to the Polygon Network (Matic Mainnet)!");
          alert("Before confirming the transaction, please make sure your web3 wallet is connected to the Polygon Network (Matic Mainnet)!");
          $("#errTxt2").css('color', 'orange');



        var gasPrice;
        var a = await web3.eth.getGasPrice(function(error, result) {
          gasPrice = (Math.ceil(result*1.5)).toString(10);//+50%
          console.log("gas price");
          console.log(gasPrice);
          console.log(result);
          });

          console.log(networktype);
          
          //var MaxFee = (2 * basefee) + priorityFee;
          //in https://polygonscan.com/gastracker -> base fee = 0////var baseFee = await (web3.eth.getBlock("pending")).baseFeePerGas;

          var price = 1000000000000000; //0.001 ether = 10^15 wei
          var msgValue = parseInt(amount*price);
          contract.methods.buyFarosCoin(amount).send(
            {
              from:  account,
              value: msgValue,
              maxFeePerGas: gasPrice,//jer je basefee = 0 pa je MaxFee = (2 * 0) + priorityFee, a priorityFee = gasPrice//
              maxPriorityFeePerGas: gasPrice,
              type: '0x2'
            } 
            ,function(error , result){
              if(!error)
              {
                console.log(result);
              } 
              else
              {
                console.log(error.code);
                 $("#errTxt2").text("The following error occured at BuyFAROS(): "+ error.code);
              }   
          })
          .on('error', function(error){ 
            console.log("Error: "+ error);
            $("#errTxt2").text("The following error occured at BuyFAROS(): "+ error);
            $("#errTxt2").css('color', 'red');
          })
          .on('transactionHash', function(transactionHash){ 
            console.log("transactionHash:");
            console.log(transactionHash);
            $("#lbltxHash").text("Transaction Hash:");
            $("#txtHash").text(transactionHash);
            $("#txtHash").attr("href", "https://polygonscan.com/tx/"+transactionHash);//change to polygon scan
            $("#lblWait").text("Please wait for the transaction to complete...");
            $("#cbHash").show();
          })
          .on('receipt', function(receipt){
            console.log("receipt:");
            console.log(receipt);
          })
          .on('confirmation', function(confirmationNumber, receipt){
            console.log("confirmation:");
            console.log(confirmationNumber ) ;
            console.log("Receipt:") ;
            console.log(receipt);
          })
          .then(function(receipt){
              console.log("then");
              $("#lblWait").hide();
              $("#btnAdd").show();
              $("#lblReceipt").text("Tx Receipt:");
              $("#txReceipt").text(JSON.stringify(receipt));
              $("#cbReceipt").show();
              $("#btnBuy").prop("disabled", true);
          });
        }
        else
        {
          $("#errTxt2").text("Change network in Web3 wallet to Polygon Network (Matic Mainnet) and click Buy FAROS again");
          $("#errTxt2").css('color', 'red');
          console.log("Change network in Web3 wallet to Polygon Network (Matic Mainnet)");
        }
      }
      catch (error) {
        console.log(error);
        $("#errTxt2").text("Error occured in async function BuyFAROS(): "+ error);
        $("#errTxt2").css('color', 'red');
        $("#notifyErr2").show();
      }
}



    $(document).ready(function(){
      $("#btnBuy").click(function(){
        event.preventDefault();
        console.log("BuyFAROS()");
        var _amount = $("#amount").val()
        if(checkWeb3() && validateForm(_amount))
        {
            BuyFAROS(_amount);
        }
    })
    });

    $(document).ready(function(){
      $("#btnAdd").click(function(){
        event.preventDefault();  
       console.log("Add token to Web3 wallet");
       addTokenMetamask();
    })
    });
    
    function isInt(value) {
      return !isNaN(value) && 
             parseInt(Number(value)) == value && 
             !isNaN(parseInt(value, 10));
    }

    function validateForm(amount) {
       let a = isInt(amount) && amount>=1 && amount<=1000000;
     
       if(!a)
       {
           $('#amount').css('border', 'solid 3px rgb(217, 83, 79)');
           $("#notifyErr0").show();
       }
       else
       {
           $('#amount').css('border', 'solid 3px rgb(92, 184, 92)');
           $("#notifyErr0").hide();
       }

       return a;
    }

    function addTokenMetamask()
    {
        window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
          type: 'ERC20',
          options: {
            address: "0xEaC4c075f20886BB8bBc2998fB59FEB6a62b04fE",
            symbol: "FAROS", 
            decimals: 2, 
            image: "https://faroscoin.com/token.png"
          },
          },
        })
        .catch((error) => {
          console.log(error)
        });
    }

    


