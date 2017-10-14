pragma solidity ^0.4.13;

/// @title EnsRelay contract that maps ens domain names to ipfs hashes
/// @author Collin Chin

 contract EnsRelay {

     mapping (string => Website) websites;

     struct Website {
         address owner;
         string ipfsHash;
     }

     modifier isOwner (address owner) {require(msg.sender == owner); _;}

     /// @dev sets ens domain name to struct of domain owner and ipfs hash
     /// @param _domain ens domain name
     /// @param _hash ipfs hash of website
     /// `msg.sender = owner of domain`
     function set(string _domain, string _hash) public {
        websites[_domain] = Website({
            owner : msg.sender,
            ipfsHash : _hash
        });
     }

    /// @dev gets ipfsHash from ens domain name
    /// @param _domain ens domain name
    /// @return ipfsHash
    /// `msg.sender = owner of domain`
     function get(string _domain)
     public
     constant
     isOwner(websites[_domain].owner)
     returns (string)
     {
         return websites[_domain].ipfsHash;
     }
 }
