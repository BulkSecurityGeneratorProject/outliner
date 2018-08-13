package outliner.repository;

import org.springframework.stereotype.Repository;

import outliner.advanced.core.data.OutlinerRepository;
import outliner.domain.L3Table;


/**
 * Spring Data  repository for the L3Table entity.
 */
@Repository
public interface L3TableRepository extends OutlinerRepository<L3Table, Long> {

}
