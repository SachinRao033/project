import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useData } from '@/contexts/DataContext';
import { ArrowUpDown, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react-native';

export default function DataScreen() {
  const { colors } = useTheme();
  const { scrapedData, isLoading, fetchData } = useData();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('title');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // Filter and sort data
  const filteredData = scrapedData
    ? scrapedData.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
    
  const sortedData = [...filteredData].sort((a, b) => {
    const fieldA = (a[sortField] || '').toString().toLowerCase();
    const fieldB = (b[sortField] || '').toString().toLowerCase();
    
    if (sortField === 'price') {
      return sortDirection === 'asc' 
        ? parseFloat(a.price) - parseFloat(b.price)
        : parseFloat(b.price) - parseFloat(a.price);
    }
    
    return sortDirection === 'asc'
      ? fieldA.localeCompare(fieldB)
      : fieldB.localeCompare(fieldA);
  });

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);
  
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <Text style={[styles.title, { color: colors.text }]}>Scraped Data</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          View and manage your scraped data
        </Text>
      </View>
      
      <View style={styles.content}>
        <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
          <View style={[styles.searchInputContainer, { backgroundColor: colors.backgroundSecondary }]}>
            <Search size={20} color={colors.textSecondary} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Search data..."
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          
          <TouchableOpacity 
            style={[styles.filterButton, { backgroundColor: colors.backgroundSecondary }]}
          >
            <Filter size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
        
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
              Loading data...
            </Text>
          </View>
        ) : (
          <>
            {paginatedData.length > 0 ? (
              <ScrollView style={styles.tableContainer} horizontal>
                <View>
                  {/* Table Header */}
                  <View style={[styles.tableRow, styles.tableHeader, { backgroundColor: colors.backgroundSecondary }]}>
                    <TouchableOpacity 
                      style={[styles.tableHeaderCell, styles.idColumn]} 
                      onPress={() => handleSort('id')}
                    >
                      <Text style={[styles.headerText, { color: colors.text }]}>ID</Text>
                      {sortField === 'id' && (
                        <ArrowUpDown size={16} color={sortDirection === 'asc' ? colors.primary : colors.error} />
                      )}
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[styles.tableHeaderCell, styles.titleColumn]} 
                      onPress={() => handleSort('title')}
                    >
                      <Text style={[styles.headerText, { color: colors.text }]}>Title</Text>
                      {sortField === 'title' && (
                        <ArrowUpDown size={16} color={sortDirection === 'asc' ? colors.primary : colors.error} />
                      )}
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[styles.tableHeaderCell, styles.categoryColumn]} 
                      onPress={() => handleSort('category')}
                    >
                      <Text style={[styles.headerText, { color: colors.text }]}>Category</Text>
                      {sortField === 'category' && (
                        <ArrowUpDown size={16} color={sortDirection === 'asc' ? colors.primary : colors.error} />
                      )}
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[styles.tableHeaderCell, styles.priceColumn]} 
                      onPress={() => handleSort('price')}
                    >
                      <Text style={[styles.headerText, { color: colors.text }]}>Price</Text>
                      {sortField === 'price' && (
                        <ArrowUpDown size={16} color={sortDirection === 'asc' ? colors.primary : colors.error} />
                      )}
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[styles.tableHeaderCell, styles.availabilityColumn]} 
                      onPress={() => handleSort('availability')}
                    >
                      <Text style={[styles.headerText, { color: colors.text }]}>Availability</Text>
                      {sortField === 'availability' && (
                        <ArrowUpDown size={16} color={sortDirection === 'asc' ? colors.primary : colors.error} />
                      )}
                    </TouchableOpacity>
                  </View>
                  
                  {/* Table Rows */}
                  {paginatedData.map((item, index) => (
                    <View 
                      key={item.id} 
                      style={[
                        styles.tableRow, 
                        { backgroundColor: index % 2 === 0 ? colors.background : colors.backgroundSecondary }
                      ]}
                    >
                      <Text style={[styles.tableCell, styles.idColumn, { color: colors.textSecondary }]}>
                        {item.id}
                      </Text>
                      <Text style={[styles.tableCell, styles.titleColumn, { color: colors.text }]}>
                        {item.title}
                      </Text>
                      <Text style={[styles.tableCell, styles.categoryColumn, { color: colors.text }]}>
                        {item.category}
                      </Text>
                      <Text style={[styles.tableCell, styles.priceColumn, { color: colors.text }]}>
                        ${parseFloat(item.price).toFixed(2)}
                      </Text>
                      <View style={[styles.tableCell, styles.availabilityColumn]}>
                        <View 
                          style={[
                            styles.statusBadge, 
                            { 
                              backgroundColor: item.inStock 
                                ? colors.successLight 
                                : colors.errorLight 
                            }
                          ]}
                        >
                          <Text 
                            style={[
                              styles.statusText, 
                              { 
                                color: item.inStock 
                                  ? colors.success 
                                  : colors.error 
                              }
                            ]}
                          >
                            {item.inStock ? 'In Stock' : 'Out of Stock'}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              </ScrollView>
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                  {searchQuery ? 'No results match your search' : 'No data available'}
                </Text>
                <TouchableOpacity 
                  style={[styles.scrapeButton, { backgroundColor: colors.primary }]}
                  onPress={fetchData}
                >
                  <Text style={styles.scrapeButtonText}>Scrape Now</Text>
                </TouchableOpacity>
              </View>
            )}
            
            {/* Pagination */}
            {paginatedData.length > 0 && (
              <View style={[styles.pagination, { backgroundColor: colors.card }]}>
                <TouchableOpacity 
                  style={[
                    styles.pageButton, 
                    { opacity: currentPage === 1 ? 0.5 : 1 }
                  ]}
                  onPress={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={20} color={colors.primary} />
                </TouchableOpacity>
                
                <Text style={[styles.pageText, { color: colors.text }]}>
                  Page {currentPage} of {totalPages}
                </Text>
                
                <TouchableOpacity 
                  style={[
                    styles.pageButton, 
                    { opacity: currentPage === totalPages ? 0.5 : 1 }
                  ]}
                  onPress={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight size={20} color={colors.primary} />
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 40,
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontFamily: 'Inter-Regular',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  tableContainer: {
    flex: 1,
    marginBottom: 16,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tableHeaderCell: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  headerText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    marginRight: 4,
  },
  tableCell: {
    padding: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  idColumn: {
    width: 60,
  },
  titleColumn: {
    width: 250,
  },
  categoryColumn: {
    width: 150,
  },
  priceColumn: {
    width: 100,
  },
  availabilityColumn: {
    width: 120,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginBottom: 16,
  },
  scrapeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  scrapeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
  },
  pageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageText: {
    marginHorizontal: 16,
    fontFamily: 'Inter-Medium',
  },
});