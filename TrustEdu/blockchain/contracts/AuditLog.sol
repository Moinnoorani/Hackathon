// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AuditLog {

    struct Record {
        string dataHash;
        uint256 timestamp;
    }

    mapping(string => Record) private records;

    event RecordStored(
        string indexed recordId,
        string dataHash,
        uint256 timestamp
    );

    function storeRecord(string memory _recordId, string memory _dataHash) public {
        records[_recordId] = Record(_dataHash, block.timestamp);
        emit RecordStored(_recordId, _dataHash, block.timestamp);
    }

    function getRecord(string memory _recordId)
        public
        view
        returns (string memory dataHash, uint256 timestamp)
    {
        Record memory r = records[_recordId];
        return (r.dataHash, r.timestamp);
    }
}
