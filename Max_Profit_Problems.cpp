#include<bits/stdc++.h>
using namespace std;


struct Property {
	int earning;
	int time;
	Property(int earning, int time){
		this->earning = earning;
		this->time = time;
	}
};

Property *theater = new Property(1500, 5);
Property *pub = new Property(1000, 4);
Property *park = new Property(3000, 10);

vector<vector<int>>result;

void findResult(int remainingTime, int remainingEarning, vector<int>imdResult) {
	// cout<<remainingTime<<" "<<remainingEarning<<"\n";
	// for(int i=0;i<imdResult.size();i++){
	// 	cout<<imdResult[i]<<" ";
	// }
	// cout<<"\n";
	if(remainingTime < 0){
		return;
	}
	if(remainingEarning < 0){
		return;
	}
	if(remainingEarning == 0){
		result.push_back(imdResult);
		return;
	}

	int currEarning = ((imdResult[0] * theater->earning) + (imdResult[1] * pub->earning) + (imdResult[2] * park->earning));
	
	if(currEarning > 0 && (remainingEarning % currEarning == 0)){
		if(remainingEarning/currEarning <= remainingTime){
			result.push_back(imdResult);
		}
	}
	findResult(remainingTime - theater->time, remainingEarning - (currEarning)*theater->time , {imdResult[0]+1, imdResult[1], imdResult[2]});
	findResult(remainingTime - pub->time, remainingEarning - (currEarning*park->time) , {imdResult[0], imdResult[1]+1, imdResult[2]});
	findResult(remainingTime - park->time, remainingEarning - (currEarning*park->time) , {imdResult[0], imdResult[1], imdResult[2]+1});

}


int main(){
	int time;
	cin>>time;
	int earning;
	cin>>earning;
	findResult(time, earning, {0,0,0});
	cout<<"Solutions\n";
	for(int i=0;i<result.size();i++){
		cout<<"\t"<<i+1<<". T:"<<result[i][0]<<"P:"<<result[i][1]<<"C:"<<result[i][2]<<"\n";
	}

}