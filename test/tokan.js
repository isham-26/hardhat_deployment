const { expect } = require("chai");
const { ethers } = require("hardhat");
 

describe("Token Contract", function () {
    //old formet
  // it("Deployment should assign the total supply of token to the owner",async function(){
  //     const [owner]=await ethers.getSigners();

  //     //console.log("Signer object",owner);

  //     const Token= await ethers.getContractFactory("Token");

  //     const hardhatToken= await Token.deploy();

  //     const ownerBalance=await hardhatToken.balanceOf(owner.address);
  //     console.log("owner.address",owner.address);

  //     expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);

  // });

  // it("transfer tokans to each other",async function(){
  //     const [owner,add1,add2]=await ethers.getSigners();

  //     const Token= await ethers.getContractFactory("Token");

  //     const hardhatToken= await Token.deploy();

  //     await hardhatToken.transfer(add1.address,10);

  //     expect(await hardhatToken.balanceOf(add1.address)).to.equal(10);

  //     await hardhatToken.connect(add1).transfer(add2.address,5);

  //     expect(await hardhatToken.balanceOf(add2.address)).to.equal(5);

  // });

  // new formet

  let owner;
  let add1;
  let add2;
  let addrs;
  let Token;
  let hardhatToken;

    beforeEach(async function () {
       Token= await ethers.getContractFactory("Token");
       [owner, add1, add2, ...addrs] = await ethers.getSigners();
       hardhatToken= await Token.deploy();
    });

    describe("Token Contract", function (){
        
        it("check right owner",async function(){
            expect(await hardhatToken.owner()).to.equal(owner.address);
        })

        

        it("Deployment should assign the total supply of token to the owner",async function(){
            const ownerBalance=await hardhatToken.balanceOf(owner.address);
            
          
            expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
        })

        it("transfer tokans to each other",async function(){
            
            await hardhatToken.transfer(add1.address,10);

            expect(await hardhatToken.balanceOf(add1.address)).to.equal(10);
          
            await hardhatToken.connect(add1).transfer(add2.address,5);
          
            expect(await hardhatToken.balanceOf(add2.address)).to.equal(5);
          
           
        })
        it("check enough tokens",async function(){
            const initialbalence= await hardhatToken.balanceOf(owner.address)

            await expect( hardhatToken.connect(add1).transfer(owner.address,1)).to.be.revertedWith("Not Enought tokens");
            expect(await hardhatToken.balanceOf(owner.address)).to.equal(initialbalence)
        });
        it("update balance",async function(){
            const initialbalence= await hardhatToken.balanceOf(owner.address)
            await hardhatToken.transfer(add1.address,10);
            await hardhatToken.transfer(add2.address,10);

            const finalBalance= await hardhatToken.balanceOf(owner.address);

            expect(finalBalance).to.equal(initialbalence-20);
            expect(await hardhatToken.balanceOf(add1.address)).to.equal(10);
            expect(await hardhatToken.balanceOf(add2.address)).to.equal(10);
        });
    });
});
