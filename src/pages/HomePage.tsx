import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useCampaigns } from '../contexts/CampaignContext';
import CampaignGrid from '../components/CampaignGrid';
import { Zap, Shield, Users, DollarSign } from 'lucide-react';
import Final from '../assets/Final.jpg'
import {sdk} from '@farcaster/miniapp-sdk'

const HomePage: React.FC = () => {

  useEffect(()=>{

  sdk.actions.ready()

  },[])

  const { publicCampaigns, loading, error } = useCampaigns();
  
  // Get featured campaigns (for this demo, we'll just use the most funded ones)
  const featuredCampaigns = [...publicCampaigns]
    .sort((a, b) => b.currentAmount - a.currentAmount)
    .slice(0, 3);
  
  // Calculate platform stats
  const totalRaised = publicCampaigns.reduce((sum, campaign) => sum + campaign.currentAmount, 0);
  const totalCampaigns = publicCampaigns.length;
  const totalContributors = new Set(
    publicCampaigns.flatMap(campaign => campaign.contributors.map(c => c.address))
  ).size;
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="text-white" style={{background: 'linear-gradient(to right, #111926, #1a2332)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Fund Your Dreams, Change The World
              </h1>
              <p className="text-lg md:text-xl mb-8" style={{color: 'rgba(255, 255, 255, 0.8)'}}>
                Funded is a decentralized crowdfunding platform that empowers creators and supports innovation through transparent, secure fundraising on base.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  to="/create" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium bg-white hover:bg-gray-50"
              style={{borderBottomColor: '#111926', color: '#111926'}}
                >
                  Start a Campaign
                </Link>
                <a 
                  href="#featured" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-white rounded-md text-base font-medium text-white"
                  style={{'--hover-bg': 'rgba(17, 25, 38, 0.1)'} as React.CSSProperties}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(17, 25, 38, 0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Explore Campaigns
                </a>
              </div>
            </div>
            <div className="hidden md:block relative">
              <img 
                src={Final} 
                alt="People collaborating" 
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4">
                <p className="font-bold text-xl" style={{color: '#111926'}}>{totalRaised.toFixed(3)} ETH</p>
                <p className="text-gray-600">Total Funds Raised</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-lg p-6 flex items-center" style={{backgroundColor: 'rgba(17, 25, 38, 0.05)'}}>
              <div className="p-4 rounded-full mr-4" style={{backgroundColor: 'rgba(17, 25, 38, 0.1)'}}>
                <DollarSign className="h-8 w-8" style={{color: '#111926'}} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalRaised.toFixed(3)} ETH</p>
                <p className="text-gray-600">Total Funded</p>
              </div>
            </div>
            
            <div className="rounded-lg p-6 flex items-center" style={{backgroundColor: 'rgba(17, 25, 38, 0.05)'}}>
              <div className="p-4 rounded-full mr-4" style={{backgroundColor: 'rgba(17, 25, 38, 0.1)'}}>
                <Zap className="h-8 w-8" style={{color: '#111926'}} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalCampaigns}</p>
                <p className="text-gray-600">Active Campaigns</p>
              </div>
            </div>
            
            <div className="rounded-lg p-6 flex items-center" style={{backgroundColor: 'rgba(17, 25, 38, 0.05)'}}>
              <div className="p-4 rounded-full mr-4" style={{backgroundColor: 'rgba(17, 25, 38, 0.1)'}}>
                <Users className="h-8 w-8" style={{color: '#111926'}} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalContributors}</p>
                <p className="text-gray-600">Contributors</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform makes crowdfunding simple, transparent, and secure through blockchain technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-md text-white mb-4" style={{backgroundColor: '#111926'}}>
                1
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Create a Campaign</h3>
              <p className="text-gray-600">
                Set up your fundraising campaign with details, images, and funding goals in minutes.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-md text-white mb-4" style={{backgroundColor: '#111926'}}>
                2
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Get Funded</h3>
              <p className="text-gray-600">
                Share your campaign and receive contributions directly to your smart contract.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-md text-white mb-4" style={{backgroundColor: '#111926'}}>
                3
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Receive Funds</h3>
              <p className="text-gray-600">
                Once your goal is met, funds are automatically disbursed to your wallet. No waiting!
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link
              to="/create"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white"
              style={{backgroundColor: '#111926', color:"white"}}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0f1419'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#111926'}
            >
              Start Your Campaign
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Campaigns Section */}
      <section id="featured" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Campaigns</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Discover innovative projects that are changing the world with the help of our community.
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{borderBottomColor: '#111926'}}></div>
              <span className="ml-3 text-gray-600">Loading campaigns...</span>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
              className="px-4 py-2 text-white rounded"
              style={{backgroundColor: '#111926'}}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0f1419'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#111926'}
              >
                Try Again
              </button>
            </div>
          ) : (
            <CampaignGrid campaigns={featuredCampaigns} showFilters={false} title="" />
          )}
          
          <div className="mt-12 text-center">
            <Link
              to="/campaigns"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white"
              style={{backgroundColor: '#111926'}}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0f1419'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#111926'}
            >
              View All Campaigns
            </Link>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-16 text-white" style={{backgroundColor: '#111926'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Why Choose Funded</h2>
            <p className="mt-4 text-lg max-w-3xl mx-auto" style={{color: 'rgba(255, 255, 255, 0.8)'}}>
              Our platform offers unique advantages through blockchain technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-4" style={{backgroundColor: '#0f1419'}}>
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-medium mb-2">Secure & Transparent</h3>
              <p style={{color: 'rgba(255, 255, 255, 0.8)'}}>
                All transactions are recorded on the blockchain for complete transparency.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-4" style={{backgroundColor: '#0f1419'}}>
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-medium mb-2">Lower Fees</h3>
              <p style={{color: 'rgba(255, 255, 255, 0.8)'}}>
                Only 5% platform fee, compared to 8-10% on traditional platforms.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-4" style={{backgroundColor: '#0f1419'}}>
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-medium mb-2">Fast Disbursement</h3>
              <p style={{color: 'rgba(255, 255, 255, 0.8)'}}>
                Receive funds automatically when your campaign reaches its goal.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-4" style={{backgroundColor: '#0f1419'}}>
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-medium mb-2">Global Community</h3>
              <p style={{color: 'rgba(255, 255, 255, 0.8)'}}>
                Access contributors from around the world without currency limitations.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Launch Your Idea?</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Join thousands of creators who have successfully funded their projects on our platform. It takes just a few minutes to get started.
                </p>
                <Link
                  to="/create"
                  className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white"
                  style={{backgroundColor: '#111926'}}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0f1419'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#111926'}
                >
                  Create Your Campaign
                </Link>
              </div>
              <div className="p-8 md:p-12 text-white" style={{background: 'linear-gradient(to right, #111926, #1a2332)'}}>
                <h3 className="text-2xl font-bold mb-4">Successful Funding</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg" style={{backgroundColor: 'rgba(17, 25, 38, 0.5)'}}>
                    <p className="font-bold">73%</p>
                    <p>of campaigns reach their funding goal</p>
                  </div>
                  <div className="p-4 rounded-lg" style={{backgroundColor: 'rgba(17, 25, 38, 0.5)'}}>
                    <p className="font-bold">$10K+</p>
                    <p>average amount raised per successful campaign</p>
                  </div>
                  <div className="p-4 rounded-lg" style={{backgroundColor: 'rgba(17, 25, 38, 0.5)'}}>
                    <p className="font-bold">48 hours</p>
                    <p>average time to receive first contribution</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
