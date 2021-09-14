
const API_BASE_URL = "http://localhost:3354";

const header = { 
    headers: {
        Authorization: 'Bearer ' + localStorage.token 
    }
};

const selectText = ["Name","Email","Registration","nbLoans","TotalLoans","Balance",
"SupportedProjects","Categories","Loan",
"Repayments"];

const selectValue = {Name:"Name",Email:"Email",Registration:"Registration",
nbLoans:"nbLoans",TotalLoans:"TotalLoans",Balance:"Balance",
SupportedProjects:"SupportedProjects-Name",
Categories:"SupportedProjects-Categories",Loan:"SupportedProjects-Loan",
Repayments:"SupportedProjects-Repayments"};

const projects ={Fundraising: "#F7B500",Repayments:"#09FB82",Finished:"#262E3F"};


const data = [{Name: "Israel Israeli",Email:"israel@mail.com",Registration:"14/09/20",
nbLoans:"3",TotalLoans:"33,000",Balance:"4,000",PlusBalance:"500",
SupportedProjects:[{Name:'"The Negev project"',Status:"Repayments",
Categories:["Periphery","Ethiopian","Community"],Loan:"10,0000",Repayments:"1,000",
left:"9,000"},{Name:'"Iggy"',Status:"Fundraising",Categories:["LGBTQ"],
Loan:"15,0000",Repayments:"2,000",left:"9,000"},{Name:'"COVID-19"',Status:"Finished",
Categories:["Health"],Loan:"8,0000",Repayments:"1,000",left:"7,000"}]},
{Name: "Yaacov chelly",Email:"yaacov@mail.com",Registration:"30/09/20",
nbLoans:"6",TotalLoans:"10,000",Balance:"6,000",
SupportedProjects:[{Name:'"The Negev project"',Status:"Repayments",
Categories:["Periphery","Ethiopian","Community"],Loan:"10,0000",Repayments:"1,000",
left:"9,000"}]},
{Name: "Ella Israela",Email:"ella@mail.com",Registration:"08/09/20",
nbLoans:"6",TotalLoans:"14,000",Balance:"7,000",
SupportedProjects:[{Name:'"Iggy"',Status:"Fundraising",
Categories:["LGBTQ"],Loan:"13,0000",Repayments:"0",
left:"7,000"}]}];


module.exports = {API_BASE_URL,header,selectText,selectValue,data,projects};